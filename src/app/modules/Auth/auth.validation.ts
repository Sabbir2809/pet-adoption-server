import { z } from "zod";

const registration = z.object({
  body: z.object({
    username: z.string({ required_error: "username Field is Required" }),
    email: z.string({ required_error: "Email Field is Required" }),
    password: z.string({ required_error: "Password Field is Required" }),
  }),
});

const refreshToken = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

const changePassword = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Old password  is required",
    }),
    newPassword: z.string({
      required_error: "New password  is required",
    }),
  }),
});

export const AuthValidationSchemas = {
  registration,
  refreshToken,
  changePassword,
};
