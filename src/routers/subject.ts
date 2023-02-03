import express from "express";
import {
  createSubject,
  deleteSubject,
  getSubject,
  getStudentOfSubject,
  getTeacherOfSubject,
  updateStudentOfSubject,
  updateSubject,
  updateTeacherOfSubject,
} from "../controllers/subject";
import { verifyToken } from "../helper/verifyToken";

const subjectRouter = express.Router();

subjectRouter
  .route("/")
  .get(verifyToken,getSubject)
  .post(createSubject)
  .put(updateSubject)
  .delete(deleteSubject);

subjectRouter
  .route("/teacher")
  .get(getTeacherOfSubject)
  .put(updateTeacherOfSubject);

subjectRouter
  .route("/student")
  .get(getStudentOfSubject)
  .put(updateStudentOfSubject);

export default subjectRouter;
