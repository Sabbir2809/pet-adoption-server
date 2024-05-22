import { Pet, Prisma } from "@prisma/client";
import { Request } from "express";
import { TFile } from "../../types/cloudinary";
import { TPaginationOptions } from "../../types/pagination";
import { fileUploader } from "../../utils/fileUploader";
import calculatePagination from "../../utils/pagination";
import prisma from "../../utils/prisma";
import { petSearchAbleFields } from "./pet.constant";

const getAllPetsFromDB = async (params: any, options: TPaginationOptions) => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.PetWhereInput[] = [];

  // only searchTerm apply fields: species, breed, age, location
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
    select: {
      id: true,
      name: true,
      photos: true,
      description: true,
      age: true,
      breed: true,
      location: true,
      createdAt: true,
      updatedAt: true,
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

const getPetDetailsFromDB = async (petId: string) => {
  // find many
  const result = await prisma.pet.findUniqueOrThrow({
    where: {
      id: petId,
    },
  });

  return result;
};

const addPetIntoDB = async (req: Request) => {
  const payload = req.body;

  // image upload to cloudinary
  const file = req.file as TFile;
  const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
  payload.photos.push(uploadToCloudinary?.secure_url);

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
  getPetDetailsFromDB,
};
