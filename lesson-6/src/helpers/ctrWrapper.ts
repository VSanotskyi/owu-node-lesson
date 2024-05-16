import { NextFunction, Request, Response } from "express";

const ctrWrapper =
  (ctrl) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res);
    } catch (e) {
      next(e);
    }
  };

export { ctrWrapper };
