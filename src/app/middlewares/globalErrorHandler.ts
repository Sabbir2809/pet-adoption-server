import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import AppError from "../errors/AppError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleZodError from "../errors/handleZodError";
import { TErrorResponse } from "../types/error";

// global Error Handler
const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // default object
  const errorResponse: TErrorResponse = {
    statusCode: error.statusCode || 500,
    message: error.message || "Internal Server Error",
    errorDetails: error,
  };

  // ZodError
  if (error instanceof ZodError) {
    const zodError = handleZodError(error);
    errorResponse.statusCode = zodError.statusCode;
    errorResponse.message = zodError.message;
    errorResponse.errorDetails = zodError.errorDetails;
  }
  // DuplicateError
  else if (error instanceof PrismaClientKnownRequestError) {
    const duplicateError = handleDuplicateError(error);
    errorResponse.statusCode = duplicateError.statusCode;
    errorResponse.message = duplicateError.message;
    errorResponse.errorDetails = duplicateError.errorDetails;
  }

  // AppError
  else if (error instanceof AppError) {
    errorResponse.statusCode = error.statusCode;
    errorResponse.message = error.message;
    errorResponse.errorDetails = error;
  }

  // response error
  return res.status(errorResponse.statusCode).json({
    success: false,
    message: errorResponse.message,
    errorDetails: errorResponse.errorDetails,
  });
};

export default globalErrorHandler;
