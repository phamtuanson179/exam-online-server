import bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { createError } from "../helper/error";
import { User } from "../models/User";
import jsonwebtoken from "jsonwebtoken";
import { createSuccess } from "../helper/success";
import { AUTH_ERROR } from "../constants/error";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return next(createError(res, AUTH_ERROR.NOT_USER));
    } else {
      const isCorrectPassword = await bcryptjs.compare(
        body.password,
        user.password
      );
      if (!isCorrectPassword) {
        return next(createError(res, AUTH_ERROR.WRONG_PASSWORD));
      } else {
        const token: string = jsonwebtoken.sign(
          { id: user._id },
          process.env.JWT ? process.env.JWT : ""
        );
        const { password, ...others } = user.toObject();

        res.status(200).json({ access_token: token });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const salt: string = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(body.password, salt);
    const newUser = new User({ ...body, password: hash });
    await newUser.save();
    createSuccess(res, newUser.toJSON());
  } catch (error) {
    next(error);
  }
};
