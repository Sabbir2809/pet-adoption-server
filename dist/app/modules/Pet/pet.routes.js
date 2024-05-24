"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const CheckAuth_1 = __importDefault(require("../../middlewares/CheckAuth"));
const fileUploader_1 = require("../../utils/fileUploader");
const pet_controller_1 = require("./pet.controller");
const pet_validation_1 = require("./pet.validation");
const petRoute = (0, express_1.Router)();
// Get Paginated and Filtered Pets
// Endpoint: GET - BASE-URL/api/v1/pets
petRoute.get("/", pet_controller_1.PetControllers.getAllPets);
// Get Paginated and Filtered Pets
// Endpoint: GET - BASE-URL/api/v1/pets
// Request Headers: Authorization: <ADMIN_TOKEN/USER_TOKEN>
petRoute.get("/:petId", (0, CheckAuth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), pet_controller_1.PetControllers.getPetDetails);
// Add a Pet
// Endpoint: POST - BASE-URL/api/v1/pets
// Request Headers: Authorization: <ADMIN_TOKEN>
petRoute.post("/", (0, CheckAuth_1.default)(client_1.UserRole.ADMIN), fileUploader_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = pet_validation_1.PetValidationSchemas.addPet.parse(JSON.parse(req.body.data));
    return pet_controller_1.PetControllers.addPet(req, res, next);
});
// Update Pet profile
// Endpoint: PATCH - BASE-URL/api/v1/pets/:petId
// Request Headers: Authorization: <ADMIN_TOKEN>
petRoute.patch("/:petId", (0, CheckAuth_1.default)(client_1.UserRole.ADMIN), fileUploader_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return pet_controller_1.PetControllers.updatePetProfile(req, res, next);
});
// Delete Pet profile
// Endpoint: PATCH - BASE-URL/api/v1/pets/:petId
// Request Headers: Authorization: <ADMIN_TOKEN>
petRoute.delete("/:petId", (0, CheckAuth_1.default)(client_1.UserRole.ADMIN), pet_controller_1.PetControllers.deletePetProfile);
exports.PetRoutes = petRoute;
