import express from "express";
import {
  createExam,
  createQuestionOfExam,
  deleteExam,
  deleteQuestionOfExam,
  getAllExam,
  getExamOfCurrentUser,
  getQuestionOfExam,
  updateExam,
  updateQuestionOfExam,
} from "../controllers/exam";
import { verifyToken } from "../helper/verifyToken";

const examRouter = express.Router();

examRouter
  .route("/")
  .get(getAllExam)
  .post(createExam)
  .put(updateExam)
  .delete(deleteExam);
examRouter
  .route("/question-of-exam")
  .get(getQuestionOfExam)
  .put(updateQuestionOfExam)
  .post(createQuestionOfExam)
  .delete(deleteQuestionOfExam);
examRouter.route("/current-user").get(verifyToken, getExamOfCurrentUser);

export default examRouter;
