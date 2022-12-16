import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, require: true },
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


