import { Response } from "express";

type TMeta = {
  page: number;
  limit: number;
  total: number;
};

type TData<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data?: T | null | undefined;
};

// send response
const sendResponse = <T>(res: Response, responseData: TData<T>) => {
  res.status(responseData.statusCode).json({
    success: responseData.success,
    statusCode: responseData.statusCode,
    message: responseData.message,
    meta: responseData.meta || null || undefined,
    data: responseData.data || null || undefined,
  });
};

export default sendResponse;
