import { z } from "zod";

const updateUserProfile = z.object({
  body: z.object({
    username: z.string({ required_error: "username Field is Required" }).optional(),
    email: z.string({ required_error: "email Field is Required" }).optional(),
  }),
});

export const UserValidationSchemas = {
  updateUserProfile,
};
