import mongoose from "mongoose";

const ClassroomExam = new mongoose.Schema(
  {
    subjectId: { type: String, required: true },
    name: { type: String, required: true },
    listExamIds: { type: [String], require: true },
    listTeacherIds: { type: [String], require: true },
    listStudentIds: { type: [String], require: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Classroom = mongoose.model("Classroom", ClassroomExam);
