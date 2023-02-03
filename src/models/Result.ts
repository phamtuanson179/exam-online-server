import mongoose from "mongoose";
import { Question } from "./Question";

const ResultSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    examId: { type: String, required: true },
    time: { type: Number, required: true },
    numberOfCorrectAnswer: { type: Number, required: true },
    isPass: { type: Number, required: true, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Result = mongoose.model("Result", ResultSchema);
