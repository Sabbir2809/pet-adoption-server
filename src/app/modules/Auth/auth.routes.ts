import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/CheckAuth";
import validationRequest from "../../middlewares/validationRequest";
import { AuthControllers } from "./auth.controller";
import { AuthValidationSchemas } from "./auth.validation";
const authRoute = Router();

// User Registration
// Endpoint: POST - BASE-URL/api/v1/auth/register
authRoute.post(
  "/register",
  validationRequest(AuthValidationSchemas.registration),
  AuthControllers.registration
);

// User Login
// Endpoint: POST - BASE-URL/api/v1/auth/login
authRoute.post("/login", AuthControllers.login);

// Refresh Token
// Endpoint: POST - BASE-URL/api/v1/auth/refresh-token
authRoute.post(
  "/refresh-token",
  validationRequest(AuthValidationSchemas.refreshToken),
  checkAuth(UserRole.ADMIN, UserRole.USER),
  AuthControllers.refreshToken
);

// Change Password
// Endpoint: POST - BASE-URL/api/v1/auth/refresh-token
authRoute.post(
  "/change-password",
  validationRequest(AuthValidationSchemas.changePassword),
  checkAuth(UserRole.ADMIN, UserRole.USER),
  AuthControllers.changePassword
);

export const AuthRoutes = authRoute;
