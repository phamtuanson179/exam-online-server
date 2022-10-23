import mongoose from "mongoose";

const UserAnswerSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true },
    resultId: { type: String, required: true },
    userId: { type: String, required: true },
    listUserAnswers: { type: String, required: true },
    isDeleted: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const UserAnswer = mongoose.model("UserAnswer", UserAnswerSchema);
