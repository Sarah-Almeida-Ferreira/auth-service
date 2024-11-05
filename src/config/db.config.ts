import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Conexão com o banco de dados PostgreSQL estabelecida com sucesso."
    );
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados PostgreSQL:", error);
  }
};

export default connectDB;
