import { NextFunction, Request, Response } from "express";
import { CLASSROOM_ERROR, QUESTION_ERROR } from "../constants/error";
import { createError } from "../helper/error";
import { resolveFilter } from "../helper/filter";
import { createSuccess } from "../helper/success";
import { Classroom } from "../models/Classroom";

export const getAllClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filterString = req.query?.filterString?.toString();
    let convertedFilter = resolveFilter(filterString);
    let listClasses = await Classroom.find({
      ...convertedFilter,
      ...{ isDeleted: false },
    });
    next(createSuccess(res, listClasses));
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
    console.log({ body });

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
