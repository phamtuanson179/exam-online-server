import express from "express";
import {
  createQuestion, deleteQuestion,
  getQuestion, updateQuestion
} from "../controllers/question";

const questionRouter = express.Router();

questionRouter
  .route("/")
  .get(getQuestion)
  .post(createQuestion)
  .put(updateQuestion)
  .delete(deleteQuestion);

export default questionRouter;
