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
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
