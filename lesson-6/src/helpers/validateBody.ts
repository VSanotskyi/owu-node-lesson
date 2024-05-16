import { NextFunction, Request, Response } from "express";

import { HttpError } from "./HttpError";

const validateBody = (schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw HttpError(400);
    }

    next();
  };
};

export { validateBody };
