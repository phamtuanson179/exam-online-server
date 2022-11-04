import { Request, Response, NextFunction } from "express";
import { USER_ERROR } from "../constants/error";
import { createError } from "../helper/error";
import { createSuccess } from "../helper/success";
import { Subject } from "../models/Subject";
import { User } from "../models/User";
import bcryptjs from "bcryptjs";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listUsers = await User.find({ isDeleted: false });
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
