import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const registration = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.registrationIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

const getProfileInformation = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as JwtPayload).user;
  const result = await UserServices.getProfileInformationFromDB(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateUserInformation = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as JwtPayload).user;
  const result = await UserServices.updateUserInformationInto(userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User profile updated successfully",
    data: result,
  });
});

export const UserControllers = {
  registration,
  getProfileInformation,
  updateUserInformation,
};
