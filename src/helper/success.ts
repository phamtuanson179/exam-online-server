import { Request, Response } from "express";

export const createSuccess = (res: Response, data: any) => {
  return res.status(200).json({ success: true, data });
};
