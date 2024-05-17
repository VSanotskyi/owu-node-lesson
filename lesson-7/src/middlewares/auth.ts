import { NextFunction, Request, Response } from "express";

import { HttpError } from "../helpers/HttpError";
import { isValidToken } from "../helpers/jwtWrapper";
import { User } from "../models/userModel";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader === undefined) {
      throw HttpError(401, "Invalid token");
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer") {
      throw HttpError(401, "Invalid token");
    }

    const { verificationToken } = isValidToken(token, "access");

    const user = await User.findOne({ verificationToken });

    if (user === null) {
      throw HttpError(401, "Invalid token");
    }

    if (user.accessToken !== token) {
      throw HttpError(401, "Invalid token");
    }

    req.body.verificationToken = verificationToken;

    next();
  } catch (err) {
    next(err);
  }
};

export { auth };
