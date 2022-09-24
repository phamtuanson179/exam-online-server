import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    subjectId: String,
    title: { type: String, required: true },
    type: String,
    answers: [String],
    image: String,
    isCorrect: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Question", QuestionSchema);
