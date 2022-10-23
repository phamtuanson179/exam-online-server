import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    image: String,
    name: { type: String, required: true },
    alias: String,
    description: String,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Subject = mongoose.model("Subject", SubjectSchema);
