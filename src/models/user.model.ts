import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db.config";

interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  confirmationCode?: string;
  expiresAt?: string;
  confirmed: boolean;
}

export interface IUserCreationAttributes
  extends Optional<IUser, "id" | "createdAt" | "updatedAt"> {}

class User extends Model<IUser, IUserCreationAttributes> {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  createdAt!: string;
  updatedAt!: string;
  confirmationCode?: string;
  expiresAt?: string;
  confirmed: boolean = false;
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
    confirmationCode: {
      type: DataTypes.STRING,
      field: "confirmation_code",
    },
    expiresAt: {
      type: DataTypes.STRING,
      field: "expires_at",
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
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
