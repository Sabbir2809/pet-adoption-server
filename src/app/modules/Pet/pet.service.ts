import { Pet, Prisma } from "@prisma/client";
import { TPaginationOptions } from "../../types/pagination";
import calculatePagination from "../../utils/pagination";
import prisma from "../../utils/prisma";
import { petSearchAbleFields } from "./pet.constant";

const getAllPetsFromDB = async (params: any, options: TPaginationOptions) => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.PetWhereInput[] = [];

  // only searchTerm apply fields: species, breed, location
  if (params.searchTerm) {
    andConditions.push({
      OR: petSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  // specific field for apply filter: ["species","breed",  "age",  "size",  "location",  "searchTerm"]
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.PetWhereInput = { AND: andConditions };

  // find many
  const result = await prisma.pet.findMany({
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
  });

  // count pet table data
  const total = await prisma.pet.count({
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

const addPetIntoDB = async (payload: Pet) => {
  const result = await prisma.pet.create({
    data: payload,
  });
  return result;
};

const updatePetProfileIntoDB = async (petId: string, payload: Partial<Pet>) => {
  const petData = await prisma.pet.findUniqueOrThrow({
    where: {
      id: petId,
    },
  });

  const result = await prisma.pet.update({
    where: {
      id: petData.id,
    },
    data: payload,
  });
  return result;
};

export const PetServices = {
  addPetIntoDB,
  updatePetProfileIntoDB,
  getAllPetsFromDB,
};
