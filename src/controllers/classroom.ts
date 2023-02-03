import { NextFunction, Request, Response } from "express";
import {
  CLASSROOM_ERROR,
  QUESTION_ERROR,
  USER_ERROR,
} from "../constants/error";
import { createError } from "../helper/error";
import { resolveFilter } from "../helper/filter";
import { filterAddAndRemoveElement } from "../helper/common";
import { createSuccess } from "../helper/success";
import { Classroom } from "../models/Classroom";
import { ExamOfClassroom } from "../models/ExamOfClassroom";
import { StudentOfClassroom } from "../models/StudentOfClassroom";
import { TeacherOfClassroom } from "../models/TeacherOfClassroom";
import mongoose from "mongoose";
import { User } from "../models/User";
import { ROLE } from "../constants/type";

export const getClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filterString = req.query?.filterString?.toString();
    let convertedFilter = resolveFilter(filterString);
    let currentUserId = req.query.currentUserId;
    let currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      next(createError(res, USER_ERROR.NOT_USER));
    }

    let listClasses:any[] = [];

    if (currentUser?.role === ROLE.ADMIN) {
      listClasses = await Classroom.find({
        ...convertedFilter,
        ...{ isDeleted: false },
      });
    }

    if (currentUser?.role === ROLE.TEACHER) {
      let listTeacherOfClassrooms = await TeacherOfClassroom.find({
        userId: currentUserId,
      });

      listClasses = await Classroom.find({
        _id: { $in: [listTeacherOfClassrooms.map((item) => item.classroomId)] },
        ...convertedFilter,
        ...{ isDeleted: false },
      });
    }

    next(createSuccess(res, listClasses));
  } catch (error) {
    next(error);
  }
};

export const getClassByExamId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    let listExamOfClassroom = await ExamOfClassroom.find({
      examId: query.examId,
    });
    let listClassroom = await Classroom.find({
      _id: {
        $in: [
          listExamOfClassroom.map(
            (item) => new mongoose.Types.ObjectId(item?.classroomId)
          ),
        ],
      },
    });
    next(createSuccess(res, listClassroom));
  } catch (error) {
    next(error);
  }
};

export const createClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;

    const classroom = new Classroom(body);
    await classroom.save();
    next(createSuccess(res, classroom.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const deleteClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const classroom = await Classroom.findById(query?.id);
    if (!classroom) {
      return next(createError(res, CLASSROOM_ERROR.NOT_CLASSROOM));
    } else {
      const deletedClassroom = await Classroom.findByIdAndUpdate(
        query?.id,
        {
          $set: { isDeleted: true },
        },
        { new: true }
      );
      next(createSuccess(res, deletedClassroom));
    }
  } catch (error) {
    next(error);
  }
};

export const updateClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const body = req.body;
    const classroom = await Classroom.findById(query?.id);
    if (!classroom) {
      return next(createError(res, CLASSROOM_ERROR.NOT_CLASSROOM));
    } else {
      const updatedClassroom = await Classroom.findByIdAndUpdate(
        query?.id,
        { $set: body },
        { new: true }
      );
      next(createSuccess(res, updatedClassroom));
    }
  } catch (error) {
    next(error);
  }
};

export const getTeacherOfClassroom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classroomId = req.query.classroomId;
    const listTeacherOfClassrooms = await TeacherOfClassroom.find({
      classroomId: classroomId,
    });
    next(createSuccess(res, listTeacherOfClassrooms));
  } catch (error) {
    next(error);
  }
};

export const updateTeacherOfClassroom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classroomId = req.query.classroomId;
    const changedListUserIds = req.body.listUserIds;
    const listTeacherOfClassrooms = await TeacherOfClassroom.find({
      classroomId: classroomId,
    });
    const curListUserIds = listTeacherOfClassrooms.map(
      (teacherOfClassroom) => teacherOfClassroom.userId
    );

    const addAndRemoveUserId = filterAddAndRemoveElement(
      curListUserIds,
      changedListUserIds
    );

    addAndRemoveUserId.add.map(async (userId: string) => {
      await TeacherOfClassroom.create({
        classroomId: classroomId,
        userId: userId,
      });
    });
    addAndRemoveUserId.delete.map(async (userId: string) => {
      await TeacherOfClassroom.findOneAndDelete({
        classroomId: classroomId,
        userId: userId,
      });
    });
    next(createSuccess(res, ""));
  } catch (error) {
    next(error);
  }
};

export const getStudentOfClassroom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classroomId = req.query.classroomId;
    const listStudentOfClassroom = await StudentOfClassroom.find({
      classroomId: classroomId,
    });
    next(createSuccess(res, listStudentOfClassroom));
  } catch (error) {
    next(error);
  }
};

export const updateStudentOfClassroom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classroomId = req.query.classroomId;
    const changedListUserIds = req.body.listUserIds;
    const listStudentOfClassrooms = await StudentOfClassroom.find({
      classroomId: classroomId,
    });
    const curListUserIds = listStudentOfClassrooms.map(
      (studentOfClassroom) => studentOfClassroom.userId
    );

    const addAndRemoveUserId = filterAddAndRemoveElement(
      curListUserIds,
      changedListUserIds
    );

    addAndRemoveUserId.add.map(async (userId: string) => {
      await StudentOfClassroom.create({
        classroomId: classroomId,
        userId: userId,
      });
    });
    addAndRemoveUserId.delete.map(async (userId: string) => {
      await StudentOfClassroom.findOneAndDelete({
        classroomId: classroomId,
        userId: userId,
      });
    });
    next(createSuccess(res, ""));
  } catch (error) {
    next(error);
  }
};

export const updateExamOfClassroom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classroomId = req.query.classroomId;
    const changedListExamIds = req.body.listExamIds;
    const listExamOfClassrooms = await ExamOfClassroom.find({
      classroomId: classroomId,
    });
    const curListExamIds = listExamOfClassrooms.map(
      (ExamOfClassroom) => ExamOfClassroom.examId
    );

    const addAndRemoveUserId = filterAddAndRemoveElement(
      curListExamIds,
      changedListExamIds
    );

    addAndRemoveUserId.add.map(async (examId: string) => {
      await ExamOfClassroom.create({
        classroomId: classroomId,
        examId: examId,
      });
    });
    addAndRemoveUserId.delete.map(async (examId: string) => {
      await ExamOfClassroom.findOneAndDelete({
        classroomId: classroomId,
        examId: examId,
      });
    });
    next(createSuccess(res, ""));
  } catch (error) {
    next(error);
  }
};

export const getExamOfClassroom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classroomId = req.query.classroomId;
    const listExamOfClassroom = await ExamOfClassroom.find({
      classroomId: classroomId,
    });
    next(createSuccess(res, listExamOfClassroom));
  } catch (error) {
    next(error);
  }
};
