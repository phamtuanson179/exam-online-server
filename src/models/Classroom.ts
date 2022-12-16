import mongoose from "mongoose";

const ClassroomExam = new mongoose.Schema(
  {
    subjectId: { type: String, required: true },
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Classroom = mongoose.model("Classroom", ClassroomExam);
