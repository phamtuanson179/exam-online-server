import express from "express";
import { createResult, downloadResult, getAllResult, getResultByExamId } from "../controllers/result";
import { verifyToken } from "../helper/verifyToken";

const resultRouter = express.Router();

resultRouter.route("/").get(getAllResult).post(verifyToken,createResult).put().delete();

resultRouter.route("/get-by-exam-id").get(verifyToken,getResultByExamId)
resultRouter.route("/download").get(downloadResult)

export default resultRouter;
