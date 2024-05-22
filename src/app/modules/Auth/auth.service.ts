import bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { generateToken } from "../../utils/JWT";
import prisma from "../../utils/prisma";

const loginFromDB = async (payload: { email: string; password: string }) => {
  // find valid user
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
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
};
