import express from "express";
import {
  createBatchUsers,
  createUser,
  deleteUser,
  getCurrentUser,
  getStudent,
  getTeacher,
  getUser,
  updateUser,
} from "../controllers/user";
import { verifyToken } from "../helper/verifyToken";
import multer from 'multer'

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
 
// var upload = multer({ storage: storage })

const userRouter = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads')
  },
  filename: (req, file, callBack) => {
      callBack(null, `${file.originalname}`)
  }
})
var upload = multer({ storage:storage });

userRouter
  .route("/")
  .get(getUser)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser);

userRouter.route("/teacher").get(getTeacher)
userRouter.route("/student").get(getStudent)
userRouter.route("/currentUser").get(verifyToken,getCurrentUser)
userRouter.route("/batch").post(upload.single('file'), createBatchUsers)

export default userRouter;