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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const fileUploader_1 = require("../../utils/fileUploader");
const pagination_1 = __importDefault(require("../../utils/pagination"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const pet_constant_1 = require("./pet.constant");
const getAllPetsFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, pagination_1.default)(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    // only searchTerm apply fields: species, breed, age, location
    if (params.searchTerm) {
        andConditions.push({
            OR: pet_constant_1.petSearchAbleFields.map((field) => ({
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
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    // find many
    const result = yield prisma_1.default.pet.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
    });
    // count pet table data
    const total = yield prisma_1.default.pet.count({
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
});
const getPetDetailsFromDB = (petId) => __awaiter(void 0, void 0, void 0, function* () {
    // find many
    const result = yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id: petId,
        },
    });
    return result;
});
const addPetIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    // image upload to cloudinary
    const file = req.file;
    const uploadToCloudinary = yield fileUploader_1.fileUploader.uploadToCloudinary(file);
    payload.photos = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    const result = yield prisma_1.default.pet.create({
        data: payload,
    });
    return result;
});
const updatePetProfileIntoDB = (petId, req) => __awaiter(void 0, void 0, void 0, function* () {
    const petData = yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id: petId,
        },
    });
    const file = req.file;
    if (file) {
        const uploadToCloudinary = yield fileUploader_1.fileUploader.uploadToCloudinary(file);
        req.body.photos = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    const result = yield prisma_1.default.pet.update({
        where: {
            id: petData.id,
        },
        data: req.body,
    });
    return Object.assign({}, result);
});
const deletePetProfileIntoDB = (petId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistPet = yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id: petId,
        },
    });
    // checking isAdoptionPet
    const isAdoptionPet = yield prisma_1.default.adoptionRequest.findFirst({
        where: {
            petId: isExistPet.id,
        },
    });
    if (isAdoptionPet) {
        throw new AppError_1.default(400, "Can not delete of Pet Profile because of the adoption");
    }
    // update
    yield prisma_1.default.pet.delete({
        where: {
            id: isExistPet.id,
        },
    });
    return null;
});
exports.PetServices = {
    addPetIntoDB,
    updatePetProfileIntoDB,
    getAllPetsFromDB,
    getPetDetailsFromDB,
    deletePetProfileIntoDB,
};
