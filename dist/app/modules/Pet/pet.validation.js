"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetValidationSchemas = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const addPet = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Name Field is Required" }),
    photos: zod_1.z.array(zod_1.z.string()),
    species: zod_1.z.string({ required_error: "Species Field is Required" }),
    breed: zod_1.z.string({ required_error: "Breed Field is Required" }),
    gender: zod_1.z.enum([client_1.Gender.MALE, client_1.Gender.FEMALE]),
    age: zod_1.z.number({ required_error: "Age Field is Required" }),
    size: zod_1.z.string({ required_error: "Size Field is Required" }),
    location: zod_1.z.string({ required_error: "Location Field is Required" }),
    description: zod_1.z.string({ required_error: "Description Field is Required" }),
    temperament: zod_1.z.string({ required_error: "Temperament Field is Required" }).optional(),
    medicalHistory: zod_1.z.string({ required_error: "MedicalHistory Field is Required" }).optional(),
    adoptionRequirements: zod_1.z.string({ required_error: "AdoptionRequirements Field is Required" }),
});
const updatePetProfile = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Name Field is Required" }).optional(),
    photos: zod_1.z.array(zod_1.z.string()).optional(),
    species: zod_1.z.string({ required_error: "Species Field is Required" }).optional(),
    breed: zod_1.z.string({ required_error: "Breed Field is Required" }).optional(),
    gender: zod_1.z.enum([client_1.Gender.MALE, client_1.Gender.FEMALE]).optional(),
    age: zod_1.z.number({ required_error: "Age Field is Required" }).optional(),
    size: zod_1.z.string({ required_error: "Size Field is Required" }).optional(),
    location: zod_1.z.string({ required_error: "Location Field is Required" }).optional(),
    description: zod_1.z.string({ required_error: "Description Field is Required" }).optional(),
    temperament: zod_1.z.string({ required_error: "Temperament Field is Required" }).optional(),
    medicalHistory: zod_1.z.string({ required_error: "MedicalHistory Field is Required" }).optional(),
    adoptionRequirements: zod_1.z
        .string({ required_error: "AdoptionRequirements Field is Required" })
        .optional(),
    body: zod_1.z.object({}),
});
exports.PetValidationSchemas = {
    addPet,
    updatePetProfile,
};
