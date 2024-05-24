"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const CheckAuth_1 = __importDefault(require("../../middlewares/CheckAuth"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const authRoute = (0, express_1.Router)();
// User Registration
// Endpoint: POST - BASE-URL/api/v1/auth/register
authRoute.post("/register", (0, validationRequest_1.default)(auth_validation_1.AuthValidationSchemas.registration), auth_controller_1.AuthControllers.registration);
// User Login
// Endpoint: POST - BASE-URL/api/v1/auth/login
authRoute.post("/login", auth_controller_1.AuthControllers.login);
// Refresh Token
// Endpoint: POST - BASE-URL/api/v1/auth/refresh-token
// Request Headers: Authorization: <ADMIN_TOKEN/USER_TOKEN>
authRoute.post("/refresh-token", (0, validationRequest_1.default)(auth_validation_1.AuthValidationSchemas.refreshToken), (0, CheckAuth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), auth_controller_1.AuthControllers.refreshToken);
// Change Password
// Endpoint: POST - BASE-URL/api/v1/auth/refresh-token
// Request Headers: Authorization: <ADMIN_TOKEN/USER_TOKEN>
authRoute.post("/change-password", (0, validationRequest_1.default)(auth_validation_1.AuthValidationSchemas.changePassword), (0, CheckAuth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), auth_controller_1.AuthControllers.changePassword);
exports.AuthRoutes = authRoute;
