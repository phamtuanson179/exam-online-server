import { NextFunction, Request, Response } from "express";
import { QUESTION_ERROR } from "../constants/error";
import { createError } from "../helper/error";
import { resolveFilter } from "../helper/filter";
import { createSuccess } from "../helper/success";
import { Question } from "../models/Question";

export const getQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questionId = req.query?.id?.toString();
    const filterString = req.query?.filterString?.toString();

    if (questionId) {
      getQuestionById(questionId, res, next)
    }
    else {
      getAllQuestion(filterString, res, next)
    }
  } catch (error) {
    next(error);
  }
};

export const createQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    console.log({ body });

    const question = new Question(body);
    await question.save();
    next(createSuccess(res, question.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const deleteQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const question = await Question.findById(query?.id);
    if (!question) {
      return next(createError(res, QUESTION_ERROR.NOT_QUESTION));
    } else {
      const deletedQuestion = await Question.findByIdAndUpdate(
        query?.id,
        {
          $set: { isDeleted: true },
        },
        { new: true }
      );
      next(createSuccess(res, deletedQuestion));
    }
  } catch (error) {
    next(error);
  }
};

export const updateQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const body = req.body;
    const question = await Question.findById(query?.id);
    if (!question) {
      return next(createError(res, QUESTION_ERROR.NOT_QUESTION));
    } else {
      const updatedQuestion = await Question.findByIdAndUpdate(
        query?.id,
        { $set: body },
        { new: true }
      );
      next(createSuccess(res, updatedQuestion));
    }
  } catch (error) {
    next(error);
  }
};

const getQuestionById = async (questionId?: string, res: Response, next: NextFunction) => {
  const question = await Question.findById(questionId);
  if (!question) {
    return next(createError(res, QUESTION_ERROR.NOT_QUESTION));
  }
  return next(createSuccess(res, question));
}

const getAllQuestion = async (filterString?: string, res: Response, next: NextFunction) => {
  let convertedFilter = resolveFilter(filterString);
  let listQuestions = await Question.find({
    ...convertedFilter,
    ...{ isDeleted: false },
  });
  return next(createSuccess(res, listQuestions));
}

