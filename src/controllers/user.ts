import { Request, Response, NextFunction } from "express";
import { USER_ERROR } from "../constants/error";
import { createError } from "../helper/error";
import { createSuccess } from "../helper/success";
import { Subject } from "../models/Subject";
import { User } from "../models/User";
import bcryptjs from "bcryptjs";
import { resolveFilter } from "../helper/filter";
import { filterAddAndRemoveElement } from "../helper/other";
import { ROLE } from "../constants/type";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log({ res });
    const filterString = req.query?.filterString?.toString();
    let convertedFilter = resolveFilter(filterString);
    const listUsers = await User.find({
      ...convertedFilter,
      ...{ isDeleted: false },
    });
    next(createSuccess(res, listUsers));
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    console.log(query);
    const body = req.body;
    const user = User.findById(query?.id);
    if (!user) {
      return next(createError(res, USER_ERROR.NOT_USER));
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        query?.id,
        { $set: body },
        { new: true }
      );
      next(createSuccess(res, updatedUser));
    }
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const salt: string = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync("1", salt);
    const newUser = new User({ ...body, password: hash });
    await newUser.save();
    createSuccess(res, newUser.toJSON());
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const user = await User.findById(query?.id);
    if (!user) {
      return next(createError(res, USER_ERROR.NOT_USER));
    } else {
      const deletedUser = await User.findByIdAndUpdate(
        query?.id,
        {
          $set: { isDeleted: true },
        },
        { new: true }
      );
      next(createSuccess(res, deletedUser));
    }
  } catch (error) {
    next(error);
  }
};

export const getTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filterString = req.query?.filterString?.toString();
    let convertedFilter = resolveFilter(filterString);
    const listUsers = await User.find({
      ...convertedFilter,
      ...{ isDeleted: false, role: ROLE.TEACHER },
    });
    next(createSuccess(res, listUsers));
  } catch (error) {
    next(error);
  }
};

export const getStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filterString = req.query?.filterString?.toString();
    let convertedFilter = resolveFilter(filterString);
    const listUsers = await User.find({
      ...convertedFilter,
      ...{ isDeleted: false, role: ROLE.STUDENT },
    });
    next(createSuccess(res, listUsers));
  } catch (error) {
    next(error);
  }
};

// export const updateStudentOfSubject = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const subjectId = req.body.subjectId;
//     const listUserIdsString = req.body.listUserIds?.toString();
//     const changedListUserIds = listUserIdsString.split(",");
//     const listStudentsOfSubject = await Student.find({ subjectId: subjectId });
//     const curListUserIds = listStudentsOfSubject.map((teach) => teach.userId);
//     const addAndRemoveUserId = filterAddAndRemoveElement(
//       curListUserIds,
//       changedListUserIds
//     );

//     addAndRemoveUserId.add.map(async (userId: string) => {
//       await Student.create({ subjectId: subjectId, userId: userId });
//     });
//     addAndRemoveUserId.delete.map(async (userId: string) => {
//       await Student.findOneAndDelete({ subjectId: subjectId, userId: userId });
//     });
//     next(createSuccess(res, ""));
//   } catch (error) {
//     next(error);
//   }
// };

// export const getStudentOfSubject = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const subjectId = req.query.subjectId;
//     const listStudents = await Student.find({ subjectId: subjectId });
//     next(createSuccess(res, listStudents));
//   } catch (error) {
//     next(error);
//   }
// };
