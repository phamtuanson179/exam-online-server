import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

//setup connect db
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO ? process.env.MONGO : "")
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export default connectDB;
