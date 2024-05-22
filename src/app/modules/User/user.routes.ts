import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/CheckAuth";
import validationRequest from "../../middlewares/validationRequest";
import { UserControllers } from "./user.controller";
import { UserValidationSchemas } from "./user.validation";
const userRouter = Router();

// User Registration
// Endpoint: POST - BASE-URL/api/v1/register
userRouter.post(
  "/register",
  validationRequest(UserValidationSchemas.registration),
  UserControllers.registration
);

// Get User Information
// Endpoint: GET - BASE-URL/api/v1/profile
// Request Headers: Authorization: <JWT_TOKEN>
userRouter.get(
  "/profile",
  checkAuth(UserRole.ADMIN, UserRole.USER),
  UserControllers.getProfileInformation
);

// Update User Information
// Endpoint: PUT - BASE-URL/api/v1/profile
// Request Headers: Authorization: <JWT_TOKEN>
userRouter.put(
  "/profile",
  checkAuth(UserRole.ADMIN, UserRole.USER),
  validationRequest(UserValidationSchemas.updateUserProfile),
  UserControllers.updateUserInformation
);

export const UserRoutes = userRouter;
