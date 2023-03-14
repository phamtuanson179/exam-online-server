import express from "express";
import multer from "multer";
import {
  createBatchClassrooms,
  createClass,
  deleteClass,
  getClass,
  getClassByExamId,
  getExamOfClassroom,
  getStudentOfClassroom,
  getTeacherOfClassroom,
  updateClass,
  updateExamOfClassroom,
  updateStudentOfClassroom,
  updateTeacherOfClassroom,
} from "../controllers/classroom";
import { verifyToken } from "../helper/verifyToken";

const classroomRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});
var upload = multer({ storage: storage });

classroomRouter
  .route("/")
  .get(verifyToken, getClass)
  .post(verifyToken, createClass)
  .put(verifyToken, updateClass)
  .delete(verifyToken, deleteClass);

classroomRouter
  .route("/get-class-by-exam-id")
  .get(verifyToken, getClassByExamId);

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

classroomRouter
  .route("/batch")
  .post(upload.single("file"), createBatchClassrooms);

export default classroomRouter;
