import jwt from "jsonwebtoken";

export default class JWTHelper {
  static generateToken(userId: number): string {
    const jwtSecret = process.env.JWT_SECRET;
    
    if (!jwtSecret) throw new Error("JWT_SECRET não definido");

    return jwt.sign({ id: userId }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRATION || "1h",
    });
  }
}
