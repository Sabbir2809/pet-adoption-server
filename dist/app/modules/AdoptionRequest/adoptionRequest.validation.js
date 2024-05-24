"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptionRequestValidationSchemes = void 0;
const zod_1 = require("zod");
const submitAdoptionRequest = zod_1.z.object({
    body: zod_1.z.object({
        petId: zod_1.z.string({ required_error: "petId Field is Required" }),
        petOwnershipExperience: zod_1.z.string({
            required_error: "petOwnershipExperience Field is Required",
        }),
    }),
});
const updateSubmitAdoptionRequestStatus = zod_1.z.object({
    body: zod_1.z.object({
        adoptionStatus: zod_1.z.string({ required_error: "adoptionStatus Field is Required" }),
    }),
});
exports.AdoptionRequestValidationSchemes = {
    submitAdoptionRequest,
    updateSubmitAdoptionRequestStatus,
};
