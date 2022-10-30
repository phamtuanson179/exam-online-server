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

const LearnSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    listSubjectId: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Learn = mongoose.model("Learn", LearnSchema);

const TeachSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    listSubjectId: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Teach = mongoose.model("Teach", TeachSchema);
