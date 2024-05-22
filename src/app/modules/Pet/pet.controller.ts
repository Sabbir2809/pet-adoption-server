import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { petFilterableFields } from "./pet.constant";
import { PetServices } from "./pet.service";

const getAllPets = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, petFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await PetServices.getAllPetsFromDB(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Pets retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getPetDetails = catchAsync(async (req: Request, res: Response) => {
  const result = await PetServices.getPetDetailsFromDB(req.params.petId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Pets retrieved successfully",
    data: result,
  });
});

const addPet = catchAsync(async (req: Request, res: Response) => {
  const result = await PetServices.addPetIntoDB(req);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Pet added successfully",
    data: result,
  });
});

const updatePetProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await PetServices.updatePetProfileIntoDB(req.params.petId, req);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Pet profile updated successfully",
    data: result,
  });
});

const deletePetProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await PetServices.deletePetProfileIntoDB(req.params.petId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Pet profile Deleted successfully",
    data: result,
  });
});

export const PetControllers = {
  addPet,
  updatePetProfile,
  getAllPets,
  getPetDetails,
  deletePetProfile,
};
