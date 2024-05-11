import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { HttpError } from "../helpers/HttpError";

const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (isObjectIdOrHexString(id) === false) {
    throw HttpError(400);
  }
  next();
};

const validateBody =
  (bodySchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = bodySchema.validate(req.body);

    if (error) {
      throw HttpError(400);
    }

    next();
  };

export const commonMiddleware = {
  isValidId,
  validateBody,
};
