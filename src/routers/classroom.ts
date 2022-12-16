import express from "express";
import { createClass, deleteClass, getAllClass, getExamOfClassroom, getStudentOfClassroom, getTeacherOfClassroom, updateClass, updateExamOfClassroom, updateStudentOfClassroom, updateTeacherOfClassroom } from "../controllers/classroom";
import { createExam, deleteExam, getAllExam, updateExam } from "../controllers/exam";

const classroomRouter = express.Router();

classroomRouter.route("/").get(getAllClass).post(createClass).put(updateClass).delete(deleteClass);
classroomRouter.route("/exam-of-classroom").get(getExamOfClassroom).put(updateExamOfClassroom)
classroomRouter.route("/student-of-classroom").get(getStudentOfClassroom).put(updateStudentOfClassroom)
classroomRouter.route("/teacher-of-classroom").get(getTeacherOfClassroom).put(updateTeacherOfClassroom)

export default classroomRouter;
