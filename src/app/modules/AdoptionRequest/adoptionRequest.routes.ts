import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/CheckAuth";
import validationRequest from "../../middlewares/validationRequest";
import { AdoptionRequestControllers } from "./adoptionRequest.controller";
import { AdoptionRequestValidationSchemes } from "./adoptionRequest.validation";
const adoptionRequestRouter = Router();

// Get Adoption Requests
// Endpoint: GET - BASE-URL/api/v1/adoption/requests
// Request Headers: Authorization: <USER_TOKEN>
adoptionRequestRouter.get(
  "/requests",
  checkAuth(UserRole.ADMIN),
  AdoptionRequestControllers.getAllAdoptionRequests
);

// Submit Adoption Request
// Endpoint: POST - BASE-URL/api/v1/adoption/requests
// Request Headers: Authorization: <USER_TOKEN>
adoptionRequestRouter.post(
  "/request",
  checkAuth(UserRole.USER),
  validationRequest(AdoptionRequestValidationSchemes.submitAdoptionRequest),
  AdoptionRequestControllers.submitAdoptionRequest
);

// Update Adoption Request Status
// Endpoint: PATCH - BASE-URL/api/v1/adoption/request/:id
// Request Headers: Authorization: <ADMIN_TOKEN>
adoptionRequestRouter.patch(
  "/request/:id",
  checkAuth(UserRole.ADMIN),
  validationRequest(AdoptionRequestValidationSchemes.updateSubmitAdoptionRequestStatus),
  AdoptionRequestControllers.updateAdoptionRequestStatus
);

export const adoptionRequestRoutes = adoptionRequestRouter;
