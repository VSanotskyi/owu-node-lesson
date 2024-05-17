import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { HttpError } from "./HttpError";

const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (isObjectIdOrHexString(id) === false) {
    throw HttpError(400);
  }
  next();
};

export { isValidId };
