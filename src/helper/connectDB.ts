import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

//setup connect db
const connectDB = () => {
  mongoose.connect("mongodb://localhost:27017/exam-online-system");

  mongoose.connection.on("connected", () => {
    console.log("DB connected");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("DB disconnected");
  });
  mongoose.connection.on("error", () => {
    console.log("DB error");
  });
};

export default connectDB;
