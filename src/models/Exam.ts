import mongoose from "mongoose";
import { EXAM_TYPE } from "../constants/type";

const ExamSchema = new mongoose.Schema(
  {
    subjectId: { type: String, required: true },
    name: { type: String, require: true },
    amountQuestion: { type: Number, required: true },
    time: { type: Number, required: true },
    // isShuffle: { type: Boolean, default: false },
    isRandomInAll: { type: Boolean, default: false },
    openTime: { type: Number, },
    closeTime: { type: Number, },
    type: { type: String, default: EXAM_TYPE.ONE },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Exam = mongoose.model("Exam", ExamSchema);
