import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { HttpError } from "../helpers/HttpError";
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

    // jwt.verify(
    //   token,
    //   process.env.JWT_SECRET,
    //   async (err, decoded: JwtPayload) => {
    //     if (err) {
    //       throw HttpError(401, "Invalid token");
    //     }
    //
    //     const user = await User.findOne({
    //       verificationToken: decoded.verificationToken,
    //     });
    //
    //     if (!user) {
    //       throw HttpError(401, "Invalid token");
    //     }
    //
    //     // if (user.accessToken !== token || user.refreshToken !== token) {
    //     //   throw HttpError(401, "Invalid token");
    //     // }
    //
    //     req.body.verificationToken = decoded.verificationToken;
    //   },
    // );

    jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err, decoded: JwtPayload) => {
        try {
          if (err) {
            throw HttpError(401, "Invalid token");
          }

          const user = await User.findOne({
            verificationToken: decoded.verificationToken,
          });

          if (!user) {
            throw HttpError(401, "Invalid token");
          }

          if (user.accessToken !== token || user.refreshToken !== token) {
            throw HttpError(401, "Invalid token");
          }
          next();

          req.body.verificationToken = decoded.verificationToken;
        } catch (err) {
          next(err);
        }
      },
    );
  } catch (err) {
    next(err);
  }
};

export { auth };
