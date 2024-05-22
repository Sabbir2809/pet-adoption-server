import prisma from "../../utils/prisma";

const getProfileInformationFromDB = async (userId: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
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

const updateUserInformationInto = async (
  userId: string,
  payload: { username: string; email: string }
) => {
  const { username, email } = payload;

  // check valid user
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  // update user information
  const result = await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: {
      username,
      email,
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

export const UserServices = {
  getProfileInformationFromDB,
  updateUserInformationInto,
};
