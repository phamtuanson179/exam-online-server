import express from "express";
import { createExam, deleteExam, getAllExam, updateExam } from "../controllers/exam";

const examRouter = express.Router();

examRouter.route("/").get(getAllExam).post(createExam).put(updateExam).delete(deleteExam);

export default examRouter;
