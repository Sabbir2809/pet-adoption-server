import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import checkAuth from "../../middlewares/CheckAuth";
import { fileUploader } from "../../utils/fileUploader";
import { UserControllers } from "./user.controller";
const userRouter = Router();

// Get My Profile
// Endpoint: GET - BASE-URL/api/v1/user/my-profile
// Request Headers: Authorization: <JWT_TOKEN>
userRouter.get(
  "/my-profile",
  checkAuth(UserRole.ADMIN, UserRole.USER),
  UserControllers.getMyProfile
);

// Update My Profile
// Endpoint: PATCH - BASE-URL/api/v1/user/update-my-profile
// Request Headers: Authorization: <JWT_TOKEN>
userRouter.patch(
  "/update-my-profile",
  checkAuth(UserRole.ADMIN, UserRole.USER),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return UserControllers.updateMyProfile(req, res, next);
  }
);

userRouter.get("/all", checkAuth(UserRole.ADMIN), UserControllers.getAllUser);

userRouter.patch("/:id/role", checkAuth(UserRole.ADMIN), UserControllers.changeProfileRole);

userRouter.patch("/:id/status", checkAuth(UserRole.ADMIN), UserControllers.changeProfileStatus);

export const UserRoutes = userRouter;
