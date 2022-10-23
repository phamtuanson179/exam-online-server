import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    subjectId: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, required: true },
    listAnswers: [String],
    listCorrectAnswers: [String],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", QuestionSchema);
