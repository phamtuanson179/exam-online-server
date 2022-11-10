import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

//setup connect db
const connectDB = () => {
  mongoose.connect(
    process.env.MONGGO_MAC_VPN ? process.env.MONGGO_MAC_VPN : ""
  );

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
