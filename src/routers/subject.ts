import express from "express";

const subjectRouter = express.Router();

subjectRouter.route("/").get().post().put().delete();

export default subjectRouter;
