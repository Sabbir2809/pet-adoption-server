import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import checkAuth from "../../middlewares/CheckAuth";
import { fileUploader } from "../../utils/fileUploader";
import { UserControllers } from "./user.controller";
const userRouter = Router();

// Get My Profile
// Endpoint: GET - BASE-URL/api/v1/user/my-profile
// Request Headers: Authorization: <ADMIN_TOKEN/USER_TOKEN>
userRouter.get(
  "/my-profile",
  checkAuth(UserRole.ADMIN, UserRole.USER),
  UserControllers.getMyProfile
);

// Update My Profile
// Endpoint: PATCH - BASE-URL/api/v1/user/update-my-profile
// Request Headers: Authorization: <ADMIN_TOKEN/USER_TOKEN>
userRouter.patch(
  "/update-my-profile",
  checkAuth(UserRole.ADMIN, UserRole.USER),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return UserControllers.updateMyProfile(req, res, next);
  }
);

// Get All User Info
// Endpoint: PATCH - BASE-URL/api/v1/user/all
// Request Headers: Authorization: <ADMIN_TOKEN>
userRouter.get("/all", checkAuth(UserRole.ADMIN), UserControllers.getAllUser);

// Change Profile Role
// Endpoint: PATCH - BASE-URL/api/v1/user/:id/role
// Request Headers: Authorization: <ADMIN_TOKEN>
userRouter.patch("/:id/role", checkAuth(UserRole.ADMIN), UserControllers.changeProfileRole);

// Change Profile Status
// Endpoint: PATCH - BASE-URL/api/v1/user/:id/status
// Request Headers: Authorization: <ADMIN_TOKEN>
userRouter.patch("/:id/status", checkAuth(UserRole.ADMIN), UserControllers.changeProfileStatus);

// Dashboard Metadata
// Endpoint: PATCH - BASE-URL/api/v1/user/dashboard
// Request Headers: Authorization: <ADMIN_TOKEN>
userRouter.get("/dashboard", checkAuth(UserRole.ADMIN), UserControllers.dashboardMetadata);

export const UserRoutes = userRouter;
