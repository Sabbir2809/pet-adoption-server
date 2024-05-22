import { ZodError, ZodIssue } from "zod";
import { TErrorDetails } from "../types/error";

const handleZodError = (error: ZodError) => {
  const statusCode = 400;
  const errorMessage = error.errors.map((item) => `${item.message}`).join(". ");

  const errorDetails: TErrorDetails = error.issues.map((issue: ZodIssue) => {
    return {
      field: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: errorMessage,
    errorDetails: {
      issues: errorDetails,
    },
  };
};

export default handleZodError;
