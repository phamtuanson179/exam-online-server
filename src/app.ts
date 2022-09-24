import express from "express";
import { authentication } from "./middlewares/authentication";

import userRouter from "./routers/user";
import examRouter from "./routers/exam";
import questionRouter from "./routers/question";
import resultRouter from "./routers/result";
import subjectRouter from "./routers/subject";
import cookieParser from "cookie-parser";
import connectDB from "./helper/connectDB";

const app = express();

//add cookie service
app.use(cookieParser());

//add middllware
app.use(authentication);

//add router
app.use("/api/user", userRouter);
app.use("/api/exam", examRouter);
app.use("/api/question", questionRouter);
app.use("/api/result", resultRouter);
app.use("/api/subject", subjectRouter);

app.listen(3000, () => {
  connectDB();
  console.log("http://localhost:3000");
});
