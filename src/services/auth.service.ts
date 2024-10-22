import User, { IUser } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (
 user: IUser
) => {
  const userExists = await User.findOne({
    where: {
      email: user.email,
    },
  });
  if (userExists) throw new Error("Usuário já existe");

  const password = await bcrypt.hash(user.password, 10);
  const data = {...user, password};

  const newUser = await User.create(data);

  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) throw new Error("Usuário não encontrado");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("Senha incorreta");

  const jwtSecret = process.env.JWT_SECRET || "";
  const token = jwt.sign({ id: user.id }, jwtSecret, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  return { user, token };
};
