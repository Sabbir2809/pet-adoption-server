import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const handleDuplicateError = (error: PrismaClientKnownRequestError) => {
  const statusCode = 409;

  return {
    statusCode,
    message: `Unique constraint failed: ${error.meta?.modelName} Model and ${error.meta?.target} Field`,
    errorDetails: error,
  };
};
export default handleDuplicateError;
