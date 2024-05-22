import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { generateToken } from "../../utils/JWT";
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

  // password check
  const isCorrectPassword = await bcrypt.compare(payload.password, userData.password);
  if (!isCorrectPassword) {
    throw new AppError(401, "Password Incorrect!");
  }

  // generate token
  const jwtPayload = {
    userId: userData.id,
    username: userData.username,
    email: userData.email,
  };
  const accessToken = generateToken(
    jwtPayload,
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  );

  return {
    id: userData.id,
    username: userData.username,
    email: userData.email,
    token: accessToken,
  };
};

export const AuthServices = {
  loginFromDB,
  registrationIntoDB,
};
