import mongoose from "mongoose";
import { Question } from "./Question";

const ResultSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    examId: { type: String, required: true },
    time: Number,
    numberOfCorrectAnswer: Number,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Result = mongoose.model("Result", ResultSchema);
