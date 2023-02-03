import { NextFunction, Request, Response } from "express";
import { EXAM_ERROR } from "../constants/error";
import { createError } from "../helper/error";
import { resolveFilter } from "../helper/filter";
import { filterAddAndRemoveElement } from "../helper/common";
import { createSuccess } from "../helper/success";
import { Exam } from "../models/Exam";
import { ExamOfClassroom } from "../models/ExamOfClassroom";
import { QuestionOfExam } from "../models/QuestionOfExam";
import { StudentOfClassroom } from "../models/StudentOfClassroom";
import { Classroom } from "../models/Classroom";

export const getExam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filterString = req.query?.filterString?.toString();
    let convertedFilter = resolveFilter(filterString);
    let listExams = await Exam.find({
      ...convertedFilter,
      ...{ isDeleted: false },
    });
    next(createSuccess(res, listExams));
  } catch (error) {
    next(error);
  }
};

export const getExamById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const examId = req.query?.id;
    let exam = await Exam.findById(examId);
    next(createSuccess(res, exam));
  } catch (error) {
    next(error);
  }
};

export const getExamByClassroomId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classroomId = req.query?.classroomId;
    const classroom = await Classroom.findById(classroomId)
    let exam = await Exam.find({subjectId: classroom?.subjectId});
    next(createSuccess(res, exam));
  } catch (error) {
    next(error);
  }
};

export const getExamOfCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUserId = req.query.currentUserId;

    const listClassroomOfUser = await StudentOfClassroom.find({
      userId: currentUserId,
    });

    let listExamOfClassroomsOfUser: any[] = [];
    await Promise.all(
      listClassroomOfUser.map(async (classroomOfUser) => {
        return await ExamOfClassroom.find({
          classroomId: classroomOfUser.classroomId,
        });
      })
    ).then((res) => {
      listExamOfClassroomsOfUser = res.reduce(
        (pre: any[], cur: any[]) => pre.concat(cur),
        []
      );
    });

    let listExams: any[] = [];
    if (listExamOfClassroomsOfUser.length > 0) {
      const listExamIds = listExamOfClassroomsOfUser.map(
        (examOfClassroom) => examOfClassroom.examId
      );

      await Promise.all(
        listExamIds.map(async (examId) => {
          return await Exam.findById(examId);
        })
      ).then((res) => {
        listExams = res;
      });
    }

    next(createSuccess(res, listExams));
  } catch (error) {
    next(error);
  }
};

export const createExam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const exam = new Exam(body);
    await exam.save();
    next(createSuccess(res, exam.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const deleteExam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const exam = await Exam.findById(query?.id);
    if (!exam) {
      return next(createError(res, EXAM_ERROR.NOT_EXAM));
    } else {
      const deletedExam = await Exam.findByIdAndUpdate(
        query?.id,
        {
          $set: { isDeleted: true },
        },
        { new: true }
      );
      next(createSuccess(res, deletedExam));
    }
  } catch (error) {
    next(error);
  }
};

export const updateExam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const body = req.body;
    const exam = await Exam.findById(query?.id);
    if (!exam) {
      return next(createError(res, EXAM_ERROR.NOT_EXAM));
    } else {
      const updatedExam = await Exam.findByIdAndUpdate(
        query?.id,
        { $set: body },
        { new: true }
      );
      next(createSuccess(res, updatedExam));
    }
  } catch (error) {
    next(error);
  }
};

export const updateQuestionOfExam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const examId = req.query.examId;
    const changedListQuestionIds = req.body.listQuestionIds;
    const listQuestionOfExams = await QuestionOfExam.find({ examId: examId });
    const curListQuestionIds = listQuestionOfExams.map(
      (questionOfExam) => questionOfExam.questionId
    );

    const addAndRemoveUserId = filterAddAndRemoveElement(
      curListQuestionIds,
      changedListQuestionIds
    );

    addAndRemoveUserId.add.map(async (questionId: string) => {
      await QuestionOfExam.create({ questionId: questionId, examId: examId });
    });
    addAndRemoveUserId.delete.map(async (questionId: string) => {
      await QuestionOfExam.findOneAndDelete({
        questionId: questionId,
        examId: examId,
      });
    });
    next(createSuccess(res, ""));
  } catch (error) {
    next(error);
  }
};

export const getQuestionOfExam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const examId = req.query.examId;
    const listQuestionOfExam = await QuestionOfExam.find({ examId: examId });
    next(createSuccess(res, listQuestionOfExam));
  } catch (error) {
    next(error);
  }
};

export const createQuestionOfExam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const examId = req.query.examId;
    const questionId = req.query.questionId;
    const exam = new QuestionOfExam({ examId: examId, questionId: questionId });
    await exam.save();
    next(createSuccess(res, ""));
  } catch (error) {
    next(error);
  }
};

export const deleteQuestionOfExam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const examId = req.query.examId;
    const questionId = req.query.questionId;
    const deletedQuestion = await QuestionOfExam.findOneAndDelete({
      examId: examId,
      questionId: questionId,
    });
    next(createSuccess(res, deletedQuestion));
  } catch (error) {
    next(error);
  }
};
