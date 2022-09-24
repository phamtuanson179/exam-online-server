import express from "express";

const examRouter = express.Router();

examRouter.route("/").get().post().put().delete();

export default examRouter;
