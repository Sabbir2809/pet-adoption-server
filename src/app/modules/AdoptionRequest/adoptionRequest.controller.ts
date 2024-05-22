import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
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
  const filters = pick(req.query, ["adoptionStatus"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await AdoptionRequestServices.getAllAdoptionRequestsFromDB(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Adoption requests retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateAdoptionRequestStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await AdoptionRequestServices.updateAdoptionRequestStatusIntoDB(
    req.params.id,
    req.body.adoptionStatus
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
