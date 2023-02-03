import express from "express";
import { getDetailQuestion, getNoPassMount, getNoTestAmount, getPassedMount, getRating, getSpectrumPoint, getTestedAmount } from "../controllers/report";

const reportRouter = express.Router();

reportRouter.route("/get-tested-amount").get(getTestedAmount);

reportRouter.route("/get-no-test-amount").get(getNoTestAmount);

reportRouter.route("/get-passed-amount").get(getPassedMount);

reportRouter.route("/get-no-pass-amount").get(getNoPassMount);

reportRouter.route("/get-spectrum-point").get(getSpectrumPoint);

reportRouter.route("/get-detail-question").get(getDetailQuestion);

reportRouter.route("/get-rating").get(getRating);

export default reportRouter;
