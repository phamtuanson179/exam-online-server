import express from "express";
import { login, signup } from "../controllers/auth";

const authRouter = express.Router();

authRouter.post("/sign-in", login);

authRouter.post("/sign-up", signup);

export default authRouter;
