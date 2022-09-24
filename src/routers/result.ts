import express from "express";

const resultRouter = express.Router();

resultRouter.route("/").get().post().put().delete();

export default resultRouter;
