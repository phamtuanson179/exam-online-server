import { NextFunction, Request, Response } from "express";
import { SUBJECT_ERROR } from "../constants/error";
import { ROLE } from "../constants/type";
import { filterAddAndRemoveElement } from "../helper/common";
import { createError } from "../helper/error";
import { createSuccess } from "../helper/success";
import { Classroom } from "../models/Classroom";
import { Subject } from "../models/Subject";
import { TeacherOfClassroom } from "../models/TeacherOfClassroom";
import { Student, Teacher, User } from "../models/User";

export const getSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUserId = req.query.currentUserId;
    const currentUser = await User.findById(currentUserId);
    let listSubjects: any[] = [];
    if (currentUser?.role === ROLE.ADMIN) {
      listSubjects = await Subject.find({ isDeleted: false });
    } else {
      const listTeacherOfClassroom = await TeacherOfClassroom.find({
        userId: currentUserId,
      });

      const listClassrooms = await Classroom.find({
        _id: { $in: listTeacherOfClassroom.map((item) => item.classroomId) },
      });

      const listSubjectIds = new Set(
        listClassrooms.map((item) => item.subjectId)
      );

      console.log({listSubjectIds});

      listSubjects = await Subject.find({
        _id: { $in:Array.from(listSubjectIds)},
        isDeleted: false,
      });
    }
    next(createSuccess(res, listSubjects));
  } catch (error) {
    next(error);
  }
};

export const createSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const subject = new Subject(body);
    await subject.save();
    next(createSuccess(res, subject.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const updateSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const body = req.body;
    const subject = await Subject.findById(query?.id);
    if (!subject) {
      return next(createError(res, SUBJECT_ERROR.NOT_SUBJECT));
    } else {
      const updatedSubject = await Subject.findByIdAndUpdate(
        query?.id,
        { $set: body },
        { new: true }
      );
      next(createSuccess(res, updatedSubject));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const subject = await Subject.findById(query?.id);
    if (!subject) {
      return next(createError(res, SUBJECT_ERROR.NOT_SUBJECT));
    } else {
      const deletedSubject = await Subject.findByIdAndUpdate(
        query?.id,
        {
          $set: { isDeleted: true },
        },
        { new: true }
      );
      next(createSuccess(res, deletedSubject));
    }
  } catch (error) {
    next(error);
  }
};

export const getTeacherOfSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subjectId = req.query.subjectId;
    const listTeachers = await Teacher.find({ subjectId: subjectId });
    next(createSuccess(res, listTeachers));
  } catch (error) {
    next(error);
  }
};

export const updateTeacherOfSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subjectId = req.body.subjectId;
    const listUserIdsString = req.body.listUserIds?.toString();
    const changedListUserIds = listUserIdsString.split(",");
    const listTeachersOfSubject = await Teacher.find({ subjectId: subjectId });
    const curListUserIds = listTeachersOfSubject.map(
      (teacher) => teacher.userId
    );
    const addAndRemoveUserId = filterAddAndRemoveElement(
      curListUserIds,
      changedListUserIds
    );

    addAndRemoveUserId.add.map(async (userId: string) => {
      await Teacher.create({ subjectId: subjectId, userId: userId });
    });
    addAndRemoveUserId.delete.map(async (userId: string) => {
      await Teacher.findOneAndDelete({ subjectId: subjectId, userId: userId });
    });
    next(createSuccess(res, ""));
  } catch (error) {
    next(error);
  }
};

export const getStudentOfSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subjectId = req.query.subjectId;
    const listStudents = await Student.find({ subjectId: subjectId });
    next(createSuccess(res, listStudents));
  } catch (error) {
    next(error);
  }
};

export const updateStudentOfSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subjectId = req.body.subjectId;
    const listUserIdsString = req.body.listUserIds?.toString();
    const changedListUserIds = listUserIdsString.split(",");
    const listStudentsOfSubject = await Student.find({ subjectId: subjectId });
    const curListUserIds = listStudentsOfSubject.map((teach) => teach.userId);
    const addAndRemoveUserId = filterAddAndRemoveElement(
      curListUserIds,
      changedListUserIds
    );

    addAndRemoveUserId.add.map(async (userId: string) => {
      await Student.create({ subjectId: subjectId, userId: userId });
    });
    addAndRemoveUserId.delete.map(async (userId: string) => {
      await Student.findOneAndDelete({ subjectId: subjectId, userId: userId });
    });
    next(createSuccess(res, ""));
  } catch (error) {
    next(error);
  }
};
