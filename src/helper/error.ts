import { Request, Response } from "express";

export const createError = (
  res: Response,
  err: { statusCode: number; message: string }
) => {
  return res
    .status(510)
    .json({ success: false, statusCode: err.statusCode, message: err.message });
};
