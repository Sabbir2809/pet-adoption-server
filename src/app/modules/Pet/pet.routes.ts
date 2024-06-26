import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import checkAuth from "../../middlewares/CheckAuth";
import { fileUploader } from "../../utils/fileUploader";
import { PetControllers } from "./pet.controller";
import { PetValidationSchemas } from "./pet.validation";
const petRoute = Router();

// Get Paginated and Filtered Pets
// Endpoint: GET - BASE-URL/api/v1/pets
petRoute.get("/", PetControllers.getAllPets);

// Get Paginated and Filtered Pets
// Endpoint: GET - BASE-URL/api/v1/pets
// Request Headers: Authorization: <ADMIN_TOKEN/USER_TOKEN>
petRoute.get("/:petId", checkAuth(UserRole.ADMIN, UserRole.USER), PetControllers.getPetDetails);

// Add a Pet
// Endpoint: POST - BASE-URL/api/v1/pets
// Request Headers: Authorization: <ADMIN_TOKEN>
petRoute.post(
  "/",
  checkAuth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = PetValidationSchemas.addPet.parse(JSON.parse(req.body.data));
    return PetControllers.addPet(req, res, next);
  }
);

// Update Pet profile
// Endpoint: PATCH - BASE-URL/api/v1/pets/:petId
// Request Headers: Authorization: <ADMIN_TOKEN>
petRoute.patch(
  "/:petId",
  checkAuth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return PetControllers.updatePetProfile(req, res, next);
  }
);

// Delete Pet profile
// Endpoint: PATCH - BASE-URL/api/v1/pets/:petId
// Request Headers: Authorization: <ADMIN_TOKEN>
petRoute.delete("/:petId", checkAuth(UserRole.ADMIN), PetControllers.deletePetProfile);

export const PetRoutes = petRoute;
