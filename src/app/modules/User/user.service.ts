import { AdoptionStatus, UserRole } from "@prisma/client";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { TPaginationOptions } from "../../types/pagination";
import { fileUploader } from "../../utils/fileUploader";
import calculatePagination from "../../utils/pagination";
import prisma from "../../utils/prisma";
import { userSearchAbleFields } from "./user.constant";
import { getPieChartData } from "./user.util";

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
      gender: true,
      phone: true,
      address: true,
      avatarURL: true,
      adoptionRequests: {
        select: {
          id: true,
          adoptionStatus: true,
          pet: {
            select: {
              name: true,
              photos: true,
              location: true,
              gender: true,
              age: true,
            },
          },
        },
      },
    },
  });

  return result;
};

const updateMyProfileInto = async (user: JwtPayload, req: Request) => {
  // Check if the user is valid and active
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.userId,
      isActive: true,
    },
  });

  // Handle file upload
  const file = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.avatarURL = uploadToCloudinary?.secure_url;
  }

  // Create an update object
  const updateData = {
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    gender: req.body.gender,
    avatarURL: req.body.avatarURL,
  };

  // Ensure that only valid fields are updated
  const profileUpdateInfo = await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: updateData,
  });

  return {
    ...profileUpdateInfo,
  };
};

const getAllUserFormDB = async (params: any, options: TPaginationOptions) => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions = [];

  // only searchTerm
  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  // specific field
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    select: {
      id: true,
      username: true,
      email: true,
      needPasswordChange: true,
      role: true,
      phone: true,
      isActive: true,
      address: true,
      avatarURL: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const changeProfileRoleIntoDB = async (id: string, role: UserRole) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateUserRole = await prisma.user.update({
    where: {
      id,
    },
    data: role,
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updateUserRole;
};

const changeProfileStatusIntoDB = async (id: string, status: boolean) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateUserRole = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isActive: status,
    },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updateUserRole;
};

const getAdminMetadata = async () => {
  const petCount = await prisma.pet.count();
  const userCount = await prisma.user.count();
  const approvedCount = await prisma.adoptionRequest.aggregate({
    _count: {
      userId: true,
    },
    where: {
      adoptionStatus: AdoptionStatus.APPROVED,
    },
  });

  const pieChartData = await getPieChartData();

  return {
    petCount,
    userCount,
    approvedCount,
    pieChartData,
  };
};

export const UserServices = {
  getMyProfileFromDB,
  updateMyProfileInto,
  getAllUserFormDB,
  changeProfileRoleIntoDB,
  changeProfileStatusIntoDB,
  getAdminMetadata,
};
