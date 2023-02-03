import { NextFunction, Request, Response } from "express";
import { createSuccess } from "../helper/success";
import { Question } from "../models/Question";
import { Result } from "../models/Result";
import { StudentOfClassroom } from "../models/StudentOfClassroom";
import { User } from "../models/User";
import { UserAnswer } from "../models/UserAnswer";
import excel from "exceljs";
import { s2ab } from "../helper/common";
export const getResultByExamId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let query = req.query;
    let result = await Result.find({
      isDeleted: false,
      examId: query.examId,
      userId: query.currentUserId,
    });
    next(createSuccess(res, result));
  } catch (error) {
    next(error);
  }
};

export const getAllResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let examId = req.query?.examId;
    let classroomId = req.query?.classroomId;

    const listStudentOfClassrooms = await StudentOfClassroom.find({
      classroomId: classroomId,
    });

    const listStudentIds = listStudentOfClassrooms.map((item) => item.userId);

    const listResults = await Result.find({
      examId: examId,
      userId: { $in: listStudentIds },
    });

    const resData = await Promise.all(
      listResults?.map(async (result) => {
        const user = await User.findById(result.userId);
        const listUserAnswers = await UserAnswer.find({
          userId: result.userId,
          resultId: result._id,
        });
        return {
          result,
          user,
          time: result.time,
          numberOfCorrectAnswer: result.numberOfCorrectAnswer,
          isPass: result.isPass,
          listUserAnswers: await Promise.all(
            listUserAnswers.map(async (userAnswer) => {
              const question = await Question.findById(userAnswer.questionId);
              return {
                question,
                userAnswer: userAnswer.userAnswer,
                status: userAnswer.status,
              };
            })
          ),
        };
      })
    );
    console.log({ resData });
    next(createSuccess(res, resData));
  } catch (error) {
    next(error);
  }
};

export const createResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const query = req.query;
    const result = new Result({
      userId: query.currentUserId,
      examId: body.examId,
      time: body.time,
      numberOfCorrectAnswer: body?.numberOfCorrectAnswer,
      isPass: body.isPass,
    });
    await result.save();

    body.listUserAnswers.forEach(async (userAnswer: any) => {
      const createUserAnswer = new UserAnswer({
        questionId: userAnswer.id,
        resultId: result._id,
        userId: query.currentUserId,
        userAnswer: userAnswer?.userAnswer ? userAnswer?.userAnswer : [],
        status: userAnswer.status,
      });

      await createUserAnswer.save();
    });
    return next(createSuccess(res, result.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const downloadResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let examId = req.query?.examId;
    let classroomId = req.query?.classroomId;

    const listStudentOfClassrooms = await StudentOfClassroom.find({
      classroomId: classroomId,
    });

    const listStudentIds = listStudentOfClassrooms.map((item) => item.userId);

    const listResults = await Result.find({
      examId: examId,
      userId: { $in: listStudentIds },
    });

    const resData = await Promise.all(
      listResults?.map(async (result) => {
        const user = await User.findById(result.userId);
        const listUserAnswers = await UserAnswer.find({
          userId: result.userId,
          resultId: result._id,
        });
        return {
          result,
          user,
          time: result.time,
          numberOfCorrectAnswer: result.numberOfCorrectAnswer,
          isPass: result.isPass,
          listUserAnswers: await Promise.all(
            listUserAnswers.map(async (userAnswer) => {
              const question = await Question.findById(userAnswer.questionId);
              return {
                question,
                userAnswer: userAnswer.userAnswer,
                status: userAnswer.status,
              };
            })
          ),
        };
      })
    );
    console.log({ resData });
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Lịch sử thi");
    worksheet.columns = [
      { header: "Tên học sinh", key: "fullname", width: 25 },
      { header: "Email", key: "email", width: 25 },
      { header: "Số điện thoại", key: "phoneNumber", width: 5 },
      { header: "Số câu trả lời đúng", key: "numberOfCorrectAnswer", width: 5 },
      { header: "Thời gian thi (giây)", key: "time", width: 5 },
      { header: "Thời gian nộp bài", key: "createdAt", width: 5 },
      { header: "Kết quả thi", key: "isPass", width: 5 },
    ];
    let convertDataToExcelData = resData.map((data) => ({
      fullname: data.user?.fullname,
      email: data.user?.email,
      phoneNumber: data.user?.phoneNumber,
      numberOfCorrectAnswer: data?.numberOfCorrectAnswer,
      time: data?.time,
      createdAt: data?.result.createdAt,
      isPass: data?.isPass === 1 ? "Đạt" : "Không đạt",
    }));
    worksheet.addRows(convertDataToExcelData);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "users.xlsx"
    );

    const data = await workbook.xlsx
      .writeFile(`./src/assets/users.xlsx`)
      .then((abc) => {
        console.log(abc);
        // var blob = new Blob([s2ab(atob("./src/assets/users.xlsx"))], {
        //   type: "",
        // });

        res.download("./src/assets/users.xlsx");
      });
  } catch (error) {
    next(error);
  }
};
