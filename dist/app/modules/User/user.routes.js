"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const CheckAuth_1 = __importDefault(require("../../middlewares/CheckAuth"));
const fileUploader_1 = require("../../utils/fileUploader");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
// Get My Profile
// Endpoint: GET - BASE-URL/api/v1/user/my-profile
// Request Headers: Authorization: <ADMIN_TOKEN/USER_TOKEN>
userRouter.get("/my-profile", (0, CheckAuth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), user_controller_1.UserControllers.getMyProfile);
// Update My Profile
// Endpoint: PATCH - BASE-URL/api/v1/user/update-my-profile
// Request Headers: Authorization: <ADMIN_TOKEN/USER_TOKEN>
userRouter.patch("/update-my-profile", (0, CheckAuth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), fileUploader_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return user_controller_1.UserControllers.updateMyProfile(req, res, next);
});
// Get All User Info
// Endpoint: PATCH - BASE-URL/api/v1/user/all
// Request Headers: Authorization: <ADMIN_TOKEN>
userRouter.get("/all", (0, CheckAuth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserControllers.getAllUser);
// Change Profile Role
// Endpoint: PATCH - BASE-URL/api/v1/user/:id/role
// Request Headers: Authorization: <ADMIN_TOKEN>
userRouter.patch("/:id/role", (0, CheckAuth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserControllers.changeProfileRole);
// Change Profile Status
// Endpoint: PATCH - BASE-URL/api/v1/user/:id/status
// Request Headers: Authorization: <ADMIN_TOKEN>
userRouter.patch("/:id/status", (0, CheckAuth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserControllers.changeProfileStatus);
// Dashboard Metadata
// Endpoint: PATCH - BASE-URL/api/v1/user/dashboard
// Request Headers: Authorization: <ADMIN_TOKEN>
userRouter.get("/dashboard", (0, CheckAuth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserControllers.dashboardMetadata);
exports.UserRoutes = userRouter;
