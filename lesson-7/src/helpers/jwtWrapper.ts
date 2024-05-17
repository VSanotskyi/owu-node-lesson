import jwt, { JwtPayload } from "jsonwebtoken";

import { tokenTypeEnum } from "../enums/tokenTypeEnum";
import { IToken } from "../interfaces/tokenInterface";
import { HttpError } from "./HttpError";

const createToken = (verificationToken: string): IToken => {
  const accessToken = jwt.sign(
    {
      verificationToken,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "1h" },
  );

  const refreshToken = jwt.sign(
    {
      verificationToken,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" },
  );

  return {
    accessToken,
    refreshToken,
  };
};

const isValidToken = (token: string, type: string): JwtPayload => {
  try {
    let secret = "";

    switch (type) {
    case tokenTypeEnum.ACCESS:
      secret = process.env.JWT_ACCESS_SECRET;
      break;

    case tokenTypeEnum.REFRESH:
      secret = process.env.JWT_REFRESH_SECRET;
      break;
    }
    return jwt.verify(token, secret) as JwtPayload;
  } catch (e) {
    throw HttpError(401, "invalid token");
  }
};

export { createToken, isValidToken };
