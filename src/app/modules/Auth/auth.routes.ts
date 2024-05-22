import { Router } from "express";
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

export const AuthRoutes = authRoute;
