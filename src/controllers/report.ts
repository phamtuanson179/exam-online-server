import { NextFunction, Request, Response } from "express";
import { Result } from "../models/Result";
import { StudentOfClassroom } from "../models/StudentOfClassroom";
import { createSuccess } from "../helper/success";
import { Classroom } from "../models/Classroom";
import { Exam } from "../models/Exam";
import { Question } from "../models/Question";
import { QuestionOfExam } from "../models/QuestionOfExam";
import mongoose, { mongo } from "mongoose";
import { User } from "../models/User";
import { UserAnswer } from "../models/UserAnswer";
import { QUESTION_TYPE } from "../constants/type";

export const getTestedAmount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classroomId = req.query?.classroomId;
    const examId = req.query?.examId;

    const listResult = await Result.find({ examId: examId });

    if (classroomId) {
      let listStudents = await StudentOfClassroom.find({
        classroomId: classroomId,
      });

      let listStudentId = listStudents?.map((item) => item.userId);

      const testedAmount = listResult?.filter((item) =>
        listStudentId.includes(item.userId)
      )?.length;

      next(createSuccess(res, testedAmount));
    } else next(createSuccess(res, listResult?.length));
  } catch (error) {
    next(error);
  }
};

export const getNoTestAmount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classroomId = req.query?.classroomId;
    const examId = req.query?.examId;

    const listResult = await Result.find({ examId: examId });

    if (classroomId) {
      let listStudents = await StudentOfClassroom.find({
        classroomId: classroomId,
      });

      let listStudentId = listStudents?.map((item) => item.userId);

      const testedAmount = listResult?.filter((item) =>
        listStudentId.includes(item.userId)
      )?.length;

      next(createSuccess(res, listStudentId.length - testedAmount));
    } else next(createSuccess(res, listResult?.length));
  } catch (error) {
    next(error);
  }
};

export const getPassedMount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classroomId = req.query?.classroomId;
    const examId = req.query?.examId;

    const listResult = await Result.find({ examId: examId });

    if (classroomId) {
      let listStudents = await StudentOfClassroom.find({
        classroomId: classroomId,
      });

      let listStudentId = listStudents?.map((item) => item.userId);

      const listResultInClassroom = listResult?.filter((item) =>
        listStudentId.includes(item.userId)
      );

      console.log('pass',listResultInClassroom);

      next(
        createSuccess(
          res,
          listResultInClassroom?.filter((item) => item?.isPass)?.length
        )
      );
    } else next(createSuccess(res, 0));
  } catch (error) {
    next(error);
  }
};

export const getNoPassMount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classroomId = req.query?.classroomId;
    const examId = req.query?.examId;

    const listResult = await Result.find({ examId: examId });

    if (classroomId) {
      let listStudents = await StudentOfClassroom.find({
        classroomId: classroomId,
      });

      let listStudentId = listStudents?.map((item) => item.userId);

      const listResultInClassroom = listResult?.filter((item) =>
        listStudentId.includes(item.userId)
      );
      console.log('no-pass',listResultInClassroom);

      next(
        createSuccess(
          res,
          listResultInClassroom?.filter((item) => !item?.isPass)?.length
        )
      );
    } else next(createSuccess(res, 0));
  } catch (error) {
    next(error);
  }
};

export const getSpectrumPoint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classroomId = req.query?.classroomId;
    const examId = req.query?.examId;

    const listResult = await Result.find({ examId: examId });

    if (classroomId) {
      let exam = await Exam.findById(examId);

      let listStudentOfClassrooms = await StudentOfClassroom.find({
        classroomId: classroomId,
      });

      let listStudentId = listStudentOfClassrooms?.map((item) => item.userId);

      const listResultInClassroom = listResult?.filter((item) =>
        listStudentId.includes(item.userId)
      );

      const listNumberOfCorrectAnswer = listResultInClassroom?.map(
        (item) => item.numberOfCorrectAnswer
      );

      next(
        createSuccess(res, {
          listPoint: listNumberOfCorrectAnswer,
          amountQuestion: exam?.amountQuestion,
        })
      );
    } else next(createSuccess(res, 0));
  } catch (error) {
    next(error);
  }
};

export const getDetailQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classroomId = req.query?.classroomId;
    const examId = req.query?.examId;

    const exam = await Exam.findById(examId);

    //get list Questions
    let listQuestions = [];
    if (exam?.isRandomInAll) {
      listQuestions = await Question.find({ subjectId: exam.subjectId });
    } else {
      const listQuestionOfExams = await QuestionOfExam.find({ examId: examId });
      const listQuestionIds = listQuestionOfExams.map(
        (item) => item.questionId
      );

      listQuestions = await Question.find({
        _id: {
          $in: listQuestionIds.map(
            (questionId) => new mongoose.Types.ObjectId(questionId)
          ),
        },
      });
    }

    //get list students
    const listStudentInClassrooms = await StudentOfClassroom.find({
      classroomId: classroomId,
    });
    const listStudentIds = listStudentInClassrooms.map((item) => item.userId);
    const listStudents = await User.find({
      _id: {
        $in: listStudentIds.map(
          (userId) => new mongoose.Types.ObjectId(userId)
        ),
      },
    });

    const listResults = await Result.find({
      userId: { $in: listStudents.map((item) => item._id) },
      examId: examId,
    });
    // console.log({ listResults });

    const resData = await Promise.all(
      listQuestions?.map(async (question) => {
        const listUserAnswers = await UserAnswer.find({
          questionId: question._id,
          resultId: { $in: listResults?.map((item) => item._id) },
        });
        return {
          question: question,
          detail:
            question.type === QUESTION_TYPE.FILL
              ? Array.from(
                  new Set(listUserAnswers.map((item) => item.userAnswer[0]))
                )?.filter(item => item)?.map((item: any) => ({
                  value: item,
                  amount: listUserAnswers.filter(
                    (userAnswer) => userAnswer.userAnswer.includes(item)
                  ).length,
                }))
              : question.listAnswers?.map((item) => ({
                  value: item,
                  amount: listUserAnswers.filter((userAnswer) =>
                    userAnswer.userAnswer.includes(item)
                  ).length,
                })),
          total: listUserAnswers?.length ?? 0,
          amountCorrectAnswer: listUserAnswers?.filter(
            (userAnswer) => userAnswer.status
          ).length,
        };
      })
    );

    createSuccess(res, resData);
    // } else next(createSuccess(res, 0));
  } catch (error) {
    next(error);
  }
};

export const getRating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classroomId = req.query?.classroomId;
    const examId = req.query?.examId;

    //get list student
    const listStudentInClassrooms = await StudentOfClassroom.find({
      classroomId: classroomId,
    });
    const listStudentIds = listStudentInClassrooms.map((item) => item.userId);
    const listStudents = await User.find({
      _id: {
        $in: listStudentIds.map(
          (userId: string) => new mongoose.Types.ObjectId(userId)
        ),
      },
    });

    const listResults = await Result.find({
      userId: { $in: listStudents.map((item) => item._id) },
      examId: examId,
    });

    const listSortedResult = listResults?.sort((result1, result2) => {
      if (result1.numberOfCorrectAnswer > result2.numberOfCorrectAnswer)
        return -1;
      else if (
        result1.numberOfCorrectAnswer === result2.numberOfCorrectAnswer
      ) {
        if (result1.time < result2?.time) {
          return -1;
        } else return 0;
      } else return 0;
    });

    const listUsers = await Promise.all(
      listSortedResult?.map(async (result) => {
        return await User.findById(result.userId);
      })
    );

    const resData = listSortedResult.map((result, index) => ({
      user: listUsers?.[index],
      time: result.time,
      numberOfCorrectAnswer: result.numberOfCorrectAnswer,
    }));

    createSuccess(res, resData);
  } catch (error) {
    next(error);
  }
};
