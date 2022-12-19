import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestion,
  getQuestionById,
  updateQuestion,
} from "../controllers/question";

const questionRouter = express.Router();

questionRouter
  .route("/")
  .get(getQuestion)
  .post(createQuestion)
  .put(updateQuestion)
  .delete(deleteQuestion);

questionRouter.route("/get-by-id").get(getQuestionById);

export default questionRouter;
