import express from "express";

const userRouter = express.Router();

userRouter.route("/").get().post().put().delete();

export default userRouter;
