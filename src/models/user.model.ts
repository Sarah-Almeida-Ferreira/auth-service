import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db.config";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UserCreationAttributes extends Optional<IUser, "id" | "createdAt" | "updatedAt"> {}

class User extends Model<IUser, UserCreationAttributes> {
  public readonly id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: true,
  }
);

export default User;
