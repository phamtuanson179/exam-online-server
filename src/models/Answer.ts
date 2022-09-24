import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    questionId: String,
    content: String,
    image: String,
    isCorrect: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Answer", AnswerSchema);
