import mongoose from "mongoose";

const UserAnswerSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true },
    resultId: { type: String, required: true },
    userId: { type: String, required: true },
    userAnswer: { type: [String], required: true },
    status: { type: Boolean, required: true },
    isDeleted: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const UserAnswer = mongoose.model("UserAnswer", UserAnswerSchema);
