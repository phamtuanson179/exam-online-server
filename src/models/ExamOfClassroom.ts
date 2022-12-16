import mongoose from "mongoose";
import { EXAM_TYPE } from "../constants/type";

const ExamOfClassroomSchema = new mongoose.Schema(
    {
        classroomId: { type: String, required: true },
        examId: { type: String, required: true },
    },
    { timestamps: true }
);

export const ExamOfClassroom = mongoose.model("ExamOfClassroom", ExamOfClassroomSchema);
