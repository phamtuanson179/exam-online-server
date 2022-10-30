import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

//setup connect db
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_LOCALHOST ? process.env.MONGO_LOCALHOST : "")
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export default connectDB;
