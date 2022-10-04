import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    content: String,
    image: String,
  },
  { timestamps: true }
);

export const Answer = mongoose.model("Answer", AnswerSchema);

export interface AnswerModel {
  content: string;
  image: string;
  isCorrect: boolean;
}
