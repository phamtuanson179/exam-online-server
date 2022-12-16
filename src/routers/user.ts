import express from "express";
import {
  createUser,
  deleteUser,
  getStudent,
  getTeacher,
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

userRouter.route("/teacher").get(getTeacher)
userRouter.route("/student").get(getStudent)

export default userRouter;
