import express from "express";
import {
  createExam,
  createQuestionOfExam,
  deleteExam,
  deleteQuestionOfExam,
  getExam,
  getExamByClassroomId,
  getExamById,
  getExamOfCurrentUser,
  getQuestionOfExam,
  updateExam,
  updateQuestionOfExam,
} from "../controllers/exam";
import { verifyToken } from "../helper/verifyToken";

const examRouter = express.Router();

examRouter
  .route("/")
  .get(verifyToken,getExam)
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
examRouter.route("/get-by-id").get(getExamById);
examRouter.route("/get-by-classroom-id").get(getExamByClassroomId);

export default examRouter;
