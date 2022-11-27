import { NextFunction, Request, Response } from "express";
import { EXAM_ERROR } from "../constants/error";
import { createError } from "../helper/error";
import { resolveFilter } from "../helper/filter";
import { createSuccess } from "../helper/success";
import { Exam } from "../models/Exam";

export const getAllExam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const filterString = req.query?.filterString?.toString();
        let convertedFilter = resolveFilter(filterString);
        let listExams = await Exam.find({
            ...convertedFilter,
            ...{ isDeleted: false },
        });
        next(createSuccess(res, listExams));
    } catch (error) {
        next(error);
    }
};
export const createExam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        const exam = new Exam(body);
        await exam.save();
        next(createSuccess(res, exam.toJSON()));
    } catch (error) {
        next(error);
    }
};

export const deleteExam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const query = req.query;
        const exam = await Exam.findById(query?.id);
        if (!exam) {
            return next(createError(res, EXAM_ERROR.NOT_EXAM));
        } else {
            const deletedExam = await Exam.findByIdAndUpdate(
                query?.id,
                {
                    $set: { isDeleted: true },
                },
                { new: true }
            );
            next(createSuccess(res, deletedExam));
        }
    } catch (error) {
        next(error);
    }
};

export const updateExam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const query = req.query;
        const body = req.body;
        const exam = await Exam.findById(query?.id);
        if (!exam) {
            return next(createError(res, EXAM_ERROR.NOT_EXAM));
        } else {
            const updatedExam = await Exam.findByIdAndUpdate(
                query?.id,
                { $set: body },
                { new: true }
            );
            next(createSuccess(res, updatedExam));
        }
    } catch (error) {
        next(error);
    }
};
