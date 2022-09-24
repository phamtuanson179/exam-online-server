import express, { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user";

const questionRouter = express.Router();

questionRouter
  .route("/")
  .get(getUser)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser);

export default questionRouter;
