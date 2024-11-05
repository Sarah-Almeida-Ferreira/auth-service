import AuthService from '../services/auth.service';
import User, { IUserCreationAttributes } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../models/user.model');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('User Service', () => {
  const userData: IUserCreationAttributes = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    confirmed: false
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    it('deve cadastrar um novo usuário', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (User.create as jest.Mock).mockResolvedValue(userData);

      const result = await AuthService.signUp(userData);
      expect(result).toEqual(userData);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: userData.email } });
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(User.create).toHaveBeenCalledWith({ ...userData, password: 'hashedPassword' });
    });

    it('deve lançar um erro quando o usuário já existe', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(userData);

      await expect(AuthService.signUp(userData)).rejects.toThrow("Usuário já existe");
    });
  });

  describe('login', () => {
    it('deve retornar o token para o usuário credenciado', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(userData);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('token');

      const result = await AuthService.login(userData.email, userData.password);
      expect(result).toEqual({ user: userData, token: 'token' });
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: userData.email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, userData.password);
      expect(jwt.sign).toHaveBeenCalledWith({ id: userData.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });
    });

    it('deve lançar um erro quando o usuário não é encontrado', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(AuthService.login(userData.email, userData.password)).rejects.toThrow("Usuário não encontrado");
    });

    it('deve lançar um erro quando a senha está incorreta', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(userData);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(AuthService.login(userData.email, userData.password)).rejects.toThrow("Senha incorreta");
    });
  });
});
