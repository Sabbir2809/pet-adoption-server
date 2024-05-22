import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdoptionRequestServices } from "./adoptionRequest.service";

const submitAdoptionRequest = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as JwtPayload).user;
  const result = await AdoptionRequestServices.submitAdoptionRequestIntoDB(userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Adoption request submitted successfully",
    data: result,
  });
});

const getAllAdoptionRequests = catchAsync(async (req: Request, res: Response) => {
  const result = await AdoptionRequestServices.getAllAdoptionRequestsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Adoption requests retrieved successfully",
    data: result,
  });
});

const updateAdoptionRequestStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await AdoptionRequestServices.updateAdoptionRequestStatusIntoDB(
    req.params.requestId,
    req.body.status
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Adoption request updated successfully",
    data: result,
  });
});

export const AdoptionRequestControllers = {
  submitAdoptionRequest,
  getAllAdoptionRequests,
  updateAdoptionRequestStatus,
};
