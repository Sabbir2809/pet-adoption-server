import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginFromDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    data: result,
  });
});

export const AuthControllers = {
  login,
};
