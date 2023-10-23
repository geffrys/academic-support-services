import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import randomstring from "randomstring";
import { CreateAccesToken } from "../libs/jwt.js";

import dotenv from "dotenv";
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

export const newUser = async (req, res) => {
  try {
    const {
      user_name,
      user_middle_name,
      user_last_name,
      user_mail,
      user_phone,
      user_password,
      user_username,
      user_type_id,
      user_identification,
      user_country,
      user_birth_date,
      user_interests,
      user_id_type_id,
    } = req.body;

    const birth = new Date(user_birth_date);

    const finalPass = await bcrypt.hash(user_password, SALT_ROUNDS);

    const [result] = await pool.query(
      "insert into users (user_name, user_middle_name, user_last_name, user_mail, user_phone, user_password, user_username, user_type_id, user_identification, user_country, user_birth_date, user_interests, user_id_type_id) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        user_name,
        user_middle_name,
        user_last_name,
        user_mail,
        user_phone,
        finalPass,
        user_username,
        user_type_id,
        user_identification,
        user_country,
        birth,
        user_interests,
        user_id_type_id,
      ]
    );
    let ids = result.insertId;
    const token = await CreateAccesToken({ id: ids, type: user_type_id });
    res.cookie("token", token);
    res.json({ message: "User created successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const LogIn = async (req, res) => {
  try {
    const { user_mail, user_password } = req.body;
    const [result] = await pool.query(
      "select * from users where user_mail = ?",
      [user_mail]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(
      user_password,
      result[0].user_password
    );

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await CreateAccesToken({ id: result[0].user_id });
    res.cookie("token", token);
    res.json(result[0]);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const logOut = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const recoverPassword = async (req, res) => {
  try {
    const { user_mail } = req.body;
    const [result] = await pool.query(
      "select * from users where user_mail = ?",
      [user_mail]
    );
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    const token = randomstring.generate({ length: 4, charset: "numeric" });

    await pool.query("UPDATE users SET token = ? WHERE user_mail = ?", [token, user_mail]);

    setTimeout(async () => {
      await pool.query("UPDATE users SET token = NULL WHERE user_mail = ?", [user_mail]);
    }, 5 * 60 * 1000);

    res.json({ message: "Token sent to your email", token: token });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { user_mail, token, user_password } = req.body;
    const [result] = await pool.query(
      "select * from users where user_mail = ?",
      [user_mail]
    );

    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = result[0];

    if (bcrypt.compareSync(token, user.token)) {
      const hashedPassword = bcrypt.hashSync(user_password, 10);
      await pool.query(
        "UPDATE users SET contrasena = ?, token = NULL WHERE user_id = ?",
        [hashedPassword, user.user_id]
      );
      res.json({ message: "Contraseña actualizada con éxito" });
    } else {
      res.status(401).json({ message: "Token no válido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    const [userFound] = await pool.query(
      "select * from users where user_id = ?",
      [decoded.id]
    );
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });
    return res.json({
      id: userFound[0].user_id,
      user_name: userFound[0].user_name,
      user_last_name: userFound[0].user_last_name,
      user_type: userFound[0].user_type_id,
    });
  });
};