import UserService from "../services/auth.service";
import { Request, Response } from "express";
import ErrorUtil from "../utils/error.util";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserService.signUp(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(ErrorUtil.parse(error));
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await UserService.login(email, password);
    res.json(user);
  } catch (error) {
    res.status(400).json(ErrorUtil.parse(error));
  }
};
