import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const registration = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.registrationIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginFromDB(req.body);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", result.refreshToken, cookieOptions);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Refresh Token Generated Successfully",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = (req as JwtPayload).user;
  const result = await AuthServices.changePasswordIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password Changed Successfully",
    data: result,
  });
});

export const AuthControllers = {
  registration,
  login,
  refreshToken,
  changePassword,
};
