import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    role: { type: String, required: true },
    dob: Number,
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
