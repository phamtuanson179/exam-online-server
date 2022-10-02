import express from "express";
// import { swaggerDocs, swaggerOptions } from "./helper/swagger";
import { authentication } from "./middlewares/authentication";

import cookieParser from "cookie-parser";
import connectDB from "./helper/connectDB";
import authRouter from "./routers/auth";
import examRouter from "./routers/exam";
import questionRouter from "./routers/question";
import resultRouter from "./routers/result";
import subjectRouter from "./routers/subject";
import userRouter from "./routers/user";

const app = express();

//add cookie service
// app.use(cookieParser());

//add middllware
// app.use(authentication);

app.use(express.json());
//add router
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/exam", examRouter);
app.use("/api/question", questionRouter);
app.use("/api/result", resultRouter);
app.use("/api/subject", subjectRouter);

app.listen(8080, () => {
  connectDB();
  console.log("http://localhost:8080");
});
