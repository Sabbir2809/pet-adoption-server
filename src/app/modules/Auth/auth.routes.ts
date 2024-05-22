import { Router } from "express";
import { AuthControllers } from "./auth.controller";
const authRoute = Router();

// User Login
// Endpoint: POST - BASE-URL/api/v1/login
authRoute.post("/login", AuthControllers.login);

export const AuthRoutes = authRoute;
