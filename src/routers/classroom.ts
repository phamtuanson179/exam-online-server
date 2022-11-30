import express from "express";
import { createClass, deleteClass, getAllClass, updateClass } from "../controllers/classroom";
import { createExam, deleteExam, getAllExam, updateExam } from "../controllers/exam";

const classroomRouter = express.Router();

classroomRouter.route("/").get(getAllClass).post(createClass).put(updateClass).delete(deleteClass);

export default classroomRouter;
