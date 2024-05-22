import { AdoptionStatus } from "@prisma/client";
import prisma from "../../utils/prisma";

const getAllAdoptionRequestsFromDB = async () => {
  const result = await prisma.adoptionRequest.findMany();
  return result;
};

const submitAdoptionRequestIntoDB = async (
  userId: string,
  payload: {
    petId: string;
    petOwnershipExperience: string;
    additionalInfo?: string;
    agreedToTerms?: boolean;
  }
) => {
  const result = await prisma.adoptionRequest.create({
    data: {
      ...payload,
      userId,
    },
  });
  return result;
};

const updateAdoptionRequestStatusIntoDB = async (requestId: string, status: AdoptionStatus) => {
  const result = await prisma.adoptionRequest.update({
    where: {
      id: requestId,
    },
    data: {
      adoptionStatus: status,
    },
  });
  return result;
};

export const AdoptionRequestServices = {
  submitAdoptionRequestIntoDB,
  getAllAdoptionRequestsFromDB,
  updateAdoptionRequestStatusIntoDB,
};
