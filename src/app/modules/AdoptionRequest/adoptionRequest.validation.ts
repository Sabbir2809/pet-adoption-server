import { z } from "zod";

const submitAdoptionRequest = z.object({
  body: z.object({
    petId: z.string({ required_error: "petId Field is Required" }),
    petOwnershipExperience: z.string({
      required_error: "petOwnershipExperience Field is Required",
    }),
  }),
});

const updateAdoptionRequestStatus = z.object({
  body: z.object({
    adoptionStatus: z.string({ required_error: "adoptionStatus Field is Required" }),
  }),
});

export const AdoptionRequestValidationSchemes = {
  submitAdoptionRequest,
  updateAdoptionRequestStatus,
};
