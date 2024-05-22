import { NextFunction, Request, Response } from "express";

// 404 not found
const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your Requested Path is Not Found!",
    },
  });
};

export default notFound;
