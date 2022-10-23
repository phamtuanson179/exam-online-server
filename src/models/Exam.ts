import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    subjectId: { type: String, required: true },
    amountQuestion: { type: Number, required: true },
    order: { type: Number, required: true },
    time: { type: Number, required: true },
    listQuestionIds: [String],
    type: [String],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Exam = mongoose.model("Exam", ExamSchema);
