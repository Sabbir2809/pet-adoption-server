import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { generateToken, verifyToken } from "../../utils/JWT";
import prisma from "../../utils/prisma";

const registrationIntoDB = async (payload: User) => {
  // check user already exits
  const isUserExist = await prisma.user.findFirst({
    where: {
      email: payload.email,
      username: payload.username,
    },
  });

  if (isUserExist?.id) {
    throw new AppError(409, "User Already Exits");
  }

  // password hashing
  const hashPassword: string = await bcrypt.hash(payload.password, 8);

  // create user
  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashPassword,
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const loginFromDB = async (payload: { email: string; password: string }) => {
  // find valid user
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      isActive: true,
    },
  });

  const { password, needPasswordChange, id: userId, role, email } = userData;

  // password compare
  const isCorrectPassword = await bcrypt.compare(payload.password, password);
  if (!isCorrectPassword) {
    throw new AppError(401, "Password Incorrect!");
  }

  // access token
  const accessToken = generateToken(
    { userId, email, role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  );

  // access token
  const refreshToken = generateToken(
    { userId, email, role },
    config.jwt.refresh_jwt_secret as Secret,
    config.jwt.refresh_jwt_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData = null;
  try {
    decodedData = verifyToken(token, config.jwt.refresh_jwt_secret as string);
  } catch (error) {
    throw new AppError(403, "Invalid Refresh Token");
  }

  const { userId, email, role } = decodedData;

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
      email: email,
      isActive: true,
    },
  });
  if (!isUserExist) {
    throw new AppError(404, "User does not exist");
  }

  const newAccessToken = generateToken(
    { userId, email, role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePasswordIntoDB = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.userId,
      email: user.email,
      isActive: true,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(payload.oldPassword, userData.password);
  if (!isCorrectPassword) {
    throw new Error("Password Incorrect!");
  }

  const hashPassword: string = await bcrypt.hash(payload.newPassword, 8);

  await prisma.user.update({
    where: {
      id: user.userId,
      email: userData.email,
    },
    data: {
      password: hashPassword,
    },
  });

  return {
    success: true,
  };
};

export const AuthServices = {
  registrationIntoDB,
  loginFromDB,
  refreshToken,
  changePasswordIntoDB,
};
