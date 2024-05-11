import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../api-error";

const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (isObjectIdOrHexString(id) === false) {
    throw new ApiError("Invalid id", 400);
  }
  next();
};

export const commonMiddleware = {
  isValidId,
};
