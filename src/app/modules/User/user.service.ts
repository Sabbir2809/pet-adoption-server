import { UserRole } from "@prisma/client";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { fileUploader } from "../../utils/fileUploader";
import prisma from "../../utils/prisma";

const getMyProfileFromDB = async (userId: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      email: true,
      needPasswordChange: true,
      role: true,
      phone: true,
      address: true,
      avatarURL: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const updateMyProfileInto = async (user: JwtPayload, req: Request) => {
  // check valid user
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.userId,
      isActive: true,
    },
  });

  const file = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.avatarURL = uploadToCloudinary?.secure_url;
  }

  let profileUpdateInfo;
  if (userData.role === UserRole.ADMIN) {
    profileUpdateInfo = await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: req.body,
    });
  } else if (userData.role === UserRole.USER) {
    profileUpdateInfo = await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: req.body,
    });
  }

  return {
    ...profileUpdateInfo,
  };
};

export const UserServices = {
  getMyProfileFromDB,
  updateMyProfileInto,
};
