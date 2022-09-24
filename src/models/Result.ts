import mongoose from "mongoose";
import Question from "./Question";

const ResultSchema = new mongoose.Schema(
  {
    subjectId: String,
    userId: String,
    point: String,
    isPass: String,
    time: String,
    questions: [Question],
  },
  { timestamps: true }
);

export default mongoose.model("Result", ResultSchema);
