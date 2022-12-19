import { NextFunction, Request, Response } from "express";
import { createError } from "./error";
import { AUTH_ERROR } from "../constants/error";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) return next(createError(res, AUTH_ERROR.NOT_AUTHENTICATED));

  jwt.verify(token, process.env.JWT, (err, currentUserId) => {
    if (err) return next(createError(res, AUTH_ERROR.TOKEN_NOT_VALID));
    req.query = { ...req.query, currentUserId: currentUserId?.id };
    next();
  });
};
