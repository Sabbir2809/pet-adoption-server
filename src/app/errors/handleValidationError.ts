import { Prisma } from "@prisma/client";
import { IGenericErrorResponse } from "../types/error";

const handleValidationError = (
  error: Prisma.PrismaClientValidationError
): IGenericErrorResponse => {
  const errors = [
    {
      path: "",
      message: error.message,
    },
  ];

  return {
    statusCode: 400,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleValidationError;
