import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Acesso negado" });
    return;
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || '';
    const decoded = jwt.verify(token, jwtSecret);
    req.body = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

export default authMiddleware;
