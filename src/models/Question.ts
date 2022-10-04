import mongoose from "mongoose";
import { Answer, AnswerModel } from "./Answer";

const QuestionSchema = new mongoose.Schema(
  {
    subjectId: String,
    title: { type: String, required: true },
    type: String,
    answers: [Answer],
    image: String,
    amountCorrectAnswer: Number,
    listCorrectAnswer: [Number],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", QuestionSchema);

export interface QuestionsWithAnswers {
  title: { type: string; required: true };
  type: string;
  amountCorrectAnswer: number;
  listCorrectAnswer: [Number];
  listUserAnswer: AnswerModel[];
  userAnswers: number[];
  isCorrect: boolean;
  image: string;
}
