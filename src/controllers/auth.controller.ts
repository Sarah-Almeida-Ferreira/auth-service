import { registerUser, loginUser } from "../services/auth.service";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json({ error: message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginUser(email, password);
    res.json({ user, token });
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json({ error: message });
  }
};
