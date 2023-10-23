import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const USERNAME_DB = process.env.USERDB;
const PASSWORD_DB = process.env.PASSDB;
const NAME_DB = process.env.DB_NAME;

export const pool = createPool({
  host: "localhost",
  port: "3306",
  user: USERNAME_DB,
  password: PASSWORD_DB,
  database: NAME_DB,
});