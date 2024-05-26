import { AdoptionStatus } from "@prisma/client";
import { TAdoptionRequest } from "../../types/globals";
import { TPaginationOptions } from "../../types/pagination";
import calculatePagination from "../../utils/pagination";
import prisma from "../../utils/prisma";

const getAllAdoptionRequestsFromDB = async (params: any, options: TPaginationOptions) => {
  const { page, limit, skip } = calculatePagination(options);
  const { ...filterData } = params;
  const andConditions = [];

  // specific field
  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }));
    andConditions.push(...filterConditions);
  }

  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

  // find many
  const result = await prisma.adoptionRequest.findMany({
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
      adoptionStatus: true,
      additionalInfo: true,
      pet: {
        select: {
          name: true,
          photos: true,
          location: true,
        },
      },
      user: {
        select: {
          username: true,
          email: true,
          phone: true,
          address: true,
          avatarURL: true,
        },
      },
    },
  });

  // count pet table data
  const total = await prisma.adoptionRequest.count({
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

const submitAdoptionRequestIntoDB = async (userId: string, payload: TAdoptionRequest) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
      isActive: true,
    },
  });

  const result = await prisma.adoptionRequest.create({
    data: {
      ...payload,
      userId,
    },
  });
  return result;
};

const updateAdoptionRequestStatusIntoDB = async (id: string, adoptionStatus: AdoptionStatus) => {
  const result = await prisma.adoptionRequest.update({
    where: { id },
    data: { adoptionStatus },
  });
  return result;
};

export const AdoptionRequestServices = {
  submitAdoptionRequestIntoDB,
  getAllAdoptionRequestsFromDB,
  updateAdoptionRequestStatusIntoDB,
};
