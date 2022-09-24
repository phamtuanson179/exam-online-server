import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

//setup connect db
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO ? process.env.MONGO : "")
    .then(() => {
      console.log("connected to mongo");
    })
    .catch((err) => {
      throw err;
    });
};

export default connectDB;
