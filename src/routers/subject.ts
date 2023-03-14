import express from "express";
import {
  createSubject,
  deleteSubject,
  getSubject,
  getStudentOfSubject,
  getTeacherOfSubject,
  updateStudentOfSubject,
  updateSubject,
  updateTeacherOfSubject,
  createBatchSubjects,
} from "../controllers/subject";
import { verifyToken } from "../helper/verifyToken";
import multer from "multer";

const subjectRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads')
  },
  filename: (req, file, callBack) => {
      callBack(null, `${file.originalname}`)
  }
})
var upload = multer({ storage:storage });

subjectRouter
  .route("/")
  .get(verifyToken,getSubject)
  .post(createSubject)
  .put(updateSubject)
  .delete(deleteSubject);

subjectRouter
  .route("/teacher")
  .get(getTeacherOfSubject)
  .put(updateTeacherOfSubject);

subjectRouter
  .route("/student")
  .get(getStudentOfSubject)
  .put(updateStudentOfSubject);

subjectRouter.route('/batch').post(upload.single('file'),createBatchSubjects)

export default subjectRouter;
