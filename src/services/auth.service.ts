import UserRepository from "../repositories/user.repository";
import PasswordHelper from "../helpers/password.helper";
import User, { IUserCreationAttributes } from "../models/user.model";
import JWTHelper from "../helpers/jwt.helper";
import dotenv from "dotenv";

dotenv.config();

interface IUserLogin {
  user: User;
  token: string;
}

export default class AuthService {
  static async signUp(user: IUserCreationAttributes): Promise<User> {
    const existingUser = await UserRepository.findByEmail(user.email);
    if (existingUser) throw new Error("Usuário já existe");

    const password = await PasswordHelper.encrypt(user.password, 10);
    const newUser = await UserRepository.create({ ...user, password });

    return newUser;
  }

  static async login(email: string, password: string): Promise<IUserLogin> {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Usuário não encontrado");
    
    await PasswordHelper.validate(password, user.password);

    const token = JWTHelper.generateToken(user.id);

    return { user, token };
  }
}
