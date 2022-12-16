import mongoose from "mongoose";
import { EXAM_TYPE } from "../constants/type";

const QuestionOfExamSchema = new mongoose.Schema(
    {
        questionId: { type: String, required: true },
        examId: { type: String, required: true },
    },
    { timestamps: true }
);

export const QuestionOfExam = mongoose.model("QuestionOfExam", QuestionOfExamSchema);
