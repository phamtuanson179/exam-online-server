import express from "express";
import {
  createClass,
  deleteClass,
  getClass,
  getExamOfClassroom,
  getStudentOfClassroom,
  getTeacherOfClassroom,
  updateClass,
  updateExamOfClassroom,
  updateStudentOfClassroom,
  updateTeacherOfClassroom,
} from "../controllers/classroom";

const classroomRouter = express.Router();

classroomRouter
  .route("/")
  .get(getClass)
  .post(createClass)
  .put(updateClass)
  .delete(deleteClass);
classroomRouter
  .route("/exam-of-classroom")
  .get(getExamOfClassroom)
  .put(updateExamOfClassroom);
classroomRouter
  .route("/student-of-classroom")
  .get(getStudentOfClassroom)
  .put(updateStudentOfClassroom);
classroomRouter
  .route("/teacher-of-classroom")
  .get(getTeacherOfClassroom)
  .put(updateTeacherOfClassroom);

export default classroomRouter;
