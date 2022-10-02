import express from "express";
import { login, signup } from "../controllers/auth";

const authRouter = express.Router();

authRouter.post("/login", login);

authRouter.post("/signup", signup);

export default authRouter;
