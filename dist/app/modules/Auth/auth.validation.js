"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidationSchemas = void 0;
const zod_1 = require("zod");
const registration = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({ required_error: "username Field is Required" }),
        email: zod_1.z.string({ required_error: "Email Field is Required" }),
        password: zod_1.z.string({ required_error: "Password Field is Required" }),
    }),
});
const refreshToken = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh Token is required",
        }),
    }),
});
const changePassword = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: "Old password  is required",
        }),
        newPassword: zod_1.z.string({
            required_error: "New password  is required",
        }),
    }),
});
exports.AuthValidationSchemas = {
    registration,
    refreshToken,
    changePassword,
};
