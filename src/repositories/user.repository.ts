import User, { IUserCreationAttributes } from "../models/user.model";

export default class UserRepository {
  static findByEmail = async (email: string) => {
    return await User.findOne({ where: { email } });
  };

  static findByConfirmationCode = async (confirmationCode: string) => {
    return await User.findOne({ where: { confirmationCode } });
  };

  static findAll = async () => {
    return await User.findAll();
  };

  static create = async (data: IUserCreationAttributes) => {
    return User.create(data);
  };
}
