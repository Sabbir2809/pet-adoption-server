"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const pick_1 = __importDefault(require("../../utils/pick"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const pet_constant_1 = require("./pet.constant");
const pet_service_1 = require("./pet.service");
const getAllPets = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, pet_constant_1.petFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield pet_service_1.PetServices.getAllPetsFromDB(filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Pets retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getPetDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pet_service_1.PetServices.getPetDetailsFromDB(req.params.petId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Pets retrieved successfully",
        data: result,
    });
}));
const addPet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pet_service_1.PetServices.addPetIntoDB(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Pet added successfully",
        data: result,
    });
}));
const updatePetProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pet_service_1.PetServices.updatePetProfileIntoDB(req.params.petId, req);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Pet profile updated successfully",
        data: result,
    });
}));
const deletePetProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pet_service_1.PetServices.deletePetProfileIntoDB(req.params.petId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Pet profile Deleted successfully",
        data: result,
    });
}));
exports.PetControllers = {
    addPet,
    updatePetProfile,
    getAllPets,
    getPetDetails,
    deletePetProfile,
};
