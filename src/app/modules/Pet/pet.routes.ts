import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/CheckAuth";
import validationRequest from "../../middlewares/validationRequest";
import { PetControllers } from "./pet.controller";
import { PetValidationSchemas } from "./pet.validation";
const petRoute = Router();

// Get Paginated and Filtered Pets
// Endpoint: GET - BASE-URL/api/v1/pets
// Request Headers: Authorization: <JWT_TOKEN>
petRoute.get("/", checkAuth(), PetControllers.getAllPets);

// Add a Pet
// Endpoint: POST - BASE-URL/api/v1/pets
// Request Headers: Authorization: <JWT_TOKEN>
petRoute.post(
  "/",
  checkAuth(UserRole.ADMIN),
  validationRequest(PetValidationSchemas.addPet),
  PetControllers.addPet
);

// Update Pet profile
// Endpoint: PUT - BASE-URL/api/v1/pets/:petId
// Request Headers: Authorization: <JWT_TOKEN>
petRoute.put(
  "/:petId",
  checkAuth(UserRole.ADMIN),
  validationRequest(PetValidationSchemas.updatePetProfile),
  PetControllers.updatePetProfile
);

export const PetRoutes = petRoute;
