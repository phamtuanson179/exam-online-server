import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    role: { type: String, required: true },
    dob: Number,
    listSubjectsId: [String],
    avatar: String,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model("Users", UserSchema);

export interface UserCreate {
  username: string;
  password: string;
  fullname: string;
  role: string;
  email: string;
  dob?: Number;
  listSubjectsId?: string[];
  avatar?: string;
}

export interface UserUpdate {
  username: string;
  fullname: string;
  role: string;
  email: string;
  dob?: Number;
  listSubjectsId?: string[];
  avatar?: string;
}
