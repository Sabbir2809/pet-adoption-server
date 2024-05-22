import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

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
  getProfileInformation,
  updateUserInformation,
};
