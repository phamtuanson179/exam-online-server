import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

//setup connect db
const connectDB = () => {
  mongoose
    .connect(process.env.MONGGO_MAC ? process.env.MONGGO_MAC : "")
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export default connectDB;
