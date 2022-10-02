import express from "express";
import {
  createSubject,
  deleteSubject,
  getAllSubject,
  updateSubject,
} from "../controllers/subject";

const subjectRouter = express.Router();

subjectRouter
  .route("/")
  .get(getAllSubject)
  .post(createSubject)
  .put(updateSubject)
  .delete(deleteSubject);

export default subjectRouter;
