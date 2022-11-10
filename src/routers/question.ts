import express from "express";
import {
  getAllQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/question";

const questionRouter = express.Router();

questionRouter
  .route("/")
  .get(getAllQuestion)
  .post(createQuestion)
  .put(updateQuestion)
  .delete(deleteQuestion);

export default questionRouter;
