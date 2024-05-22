import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/CheckAuth";
import validationRequest from "../../middlewares/validationRequest";
import { AdoptionRequestControllers } from "./adoptionRequest.controller";
import { AdoptionRequestValidationSchemes } from "./adoptionRequest.validation";
const adoptionRequestRouter = Router();

// Get Adoption Requests
// Endpoint: GET - BASE-URL/api/v1/adoption-requests
// Request Headers: Authorization: <JWT_TOKEN>
adoptionRequestRouter.get(
  "/adoption-requests",
  checkAuth(UserRole.ADMIN),
  AdoptionRequestControllers.getAllAdoptionRequests
);

// Submit Adoption Request
// Endpoint: POST - BASE-URL/api/v1/adoption-requests
// Request Headers: Authorization: <JWT_TOKEN>
adoptionRequestRouter.post(
  "/adoption-request",
  checkAuth(UserRole.USER),
  validationRequest(AdoptionRequestValidationSchemes.submitAdoptionRequest),
  AdoptionRequestControllers.submitAdoptionRequest
);

// Update Adoption Request Status
// Endpoint: PUT - BASE-URL/api/v1/adoption-requests/:requestId
// Request Headers: Authorization: <JWT_TOKEN>
adoptionRequestRouter.put(
  "/adoption-requests/:requestId",
  checkAuth(UserRole.ADMIN),
  validationRequest(AdoptionRequestValidationSchemes.updateSubmitAdoptionRequestStatus),
  AdoptionRequestControllers.updateAdoptionRequestStatus
);

export const adoptionRequestRoutes = adoptionRequestRouter;
