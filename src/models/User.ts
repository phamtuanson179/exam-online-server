import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, require: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    role: { type: String, required: true },
    avatar: String,
    address: String,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model("Users", UserSchema);

const TeacherSchema = new mongoose.Schema(
  {
    subjectId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Teacher = mongoose.model("Teacher", TeacherSchema);

const StudentSchema = new mongoose.Schema(
  {
    subjectId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", StudentSchema);
