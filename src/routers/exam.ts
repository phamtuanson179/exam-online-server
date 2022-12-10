import express from "express";
import { createExam, createQuestionOfExam, deleteExam, deleteQuestionOfExam, getAllExam, getQuestionOfExam, updateExam, updateQuestionOfExam } from "../controllers/exam";

const examRouter = express.Router();

examRouter.route("/").get(getAllExam).post(createExam).put(updateExam).delete(deleteExam);
examRouter.route("/question-of-exam").get(getQuestionOfExam).put(updateQuestionOfExam).post(createQuestionOfExam).delete(deleteQuestionOfExam)

export default examRouter;
