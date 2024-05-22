import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

// Zod Validation Schema
const validationRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };
};

export default validationRequest;
