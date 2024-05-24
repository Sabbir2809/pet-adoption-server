import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { userFilterableFields } from "./user.constant";
import { UserServices } from "./user.service";

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as JwtPayload).user;
  const result = await UserServices.getMyProfileFromDB(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user;
  const result = await UserServices.updateMyProfileInto(user, req);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User profile updated successfully",
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserServices.getAllUserFormDB(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Get All User profile successfully",
    meta: result.meta,
    data: result.data,
  });
});

const changeProfileRole = catchAsync(async (req, res) => {
  const result = await UserServices.changeProfileRoleIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Profile Role Change Successfully!",
    data: result,
  });
});

const changeProfileStatus = catchAsync(async (req, res) => {
  const result = await UserServices.changeProfileStatusIntoDB(req.params.id, req.body.status);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Profile Role Change Successfully!",
    data: result,
  });
});

const dashboardMetadata = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAdminMetadata();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export const UserControllers = {
  getMyProfile,
  updateMyProfile,
  getAllUser,
  changeProfileRole,
  changeProfileStatus,
  dashboardMetadata,
};
