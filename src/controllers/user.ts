import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listUsers = await User.find();
    res.status(200).json(listUsers);
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (
  res: Request,
  req: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const deleteUser = () => {};
export const createUser = () => {};
