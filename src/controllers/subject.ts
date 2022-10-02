import { NextFunction, Request, Response } from "express";
import { SUBJECT_ERROR } from "../constants/error";
import { createError } from "../helper/error";
import { createSuccess } from "../helper/success";
import { Subject } from "../models/Subject";

export const getAllSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listSubjects = await Subject.find({ isDeleted: false });
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
