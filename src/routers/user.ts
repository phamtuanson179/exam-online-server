import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user";

const userRouter = express.Router();

userRouter
  .route("/")
  .get(getUser)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser);

export default userRouter;
