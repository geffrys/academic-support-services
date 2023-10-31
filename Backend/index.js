import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mainRouter from "./routes/main.routes.js";
import cookieParser from "cookie-parser";
import bodyparser from "body-parser";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use("/api/v1", mainRouter);
app.listen(PORT);
console.log("Server Running on port " + PORT);
