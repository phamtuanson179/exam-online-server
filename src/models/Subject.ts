import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    image: String,
    name: { type: String, required: true },
    alias: String,
    description: String,
    time: String,
    amount: Number,
    minCorrectQuestion: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Subject", SubjectSchema);
