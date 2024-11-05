import bcrypt from "bcryptjs";

export default class PasswordHelper {
  static async encrypt(password: string, length: number): Promise<string> {
    return bcrypt.hash(password, length);
  }

  static async validate(password: string, userPassword: string): Promise<void> {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) throw new Error("Senha incorreta");
  }
}
