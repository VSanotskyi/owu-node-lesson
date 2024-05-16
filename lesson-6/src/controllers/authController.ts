import * as crypto from "node:crypto";

import bcrypto from "bcrypt";
import { Request, Response } from "express";

import { ctrWrapper } from "../helpers/ctrWrapper";
import { HttpError } from "../helpers/HttpError";
import { createToken, isValidToken } from "../helpers/jwtWrapper";
import { User } from "../models/userModel";

const signUp = async (req: Request, res: Response): Promise<void> => {
  const dto = req.body;
  const normalizeEmail = dto.email.toLowerCase();
  const user = await User.findOne({ email: normalizeEmail });

  if (user) {
    throw HttpError(409);
  }

  const passwordHash = await bcrypto.hash(dto.password, 10);

  const verificationToken = crypto.randomUUID();

  const token = createToken(verificationToken);

  await User.create({
    ...dto,
    ...token,
    verificationToken,
    email: normalizeEmail,
    password: passwordHash,
  });

  res.status(201).json({ message: "Create users successful", ...token });
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user === null) {
    throw HttpError(401, "Email or password is incorrect");
  }

  const isMatch = await bcrypto.compare(password, user.password);

  if (isMatch === false) {
    throw HttpError(401, "Email or password is incorrect");
  }

  const token = createToken(user.verificationToken);

  await User.findByIdAndUpdate(user._id, { ...token });

  res.json({ ...token, message: "Sign-in is success" });
};

const logout = async (req: Request, res: Response) => {
  const { verificationToken } = req.body;

  await User.findOneAndUpdate(
    { verificationToken },
    { accessToken: null, refreshToken: null },
  );

  res.status(204).end();
};

const refresh = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (authHeader === undefined) {
    throw HttpError(401, "Invalid token");
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer") {
    throw HttpError(401, "Invalid token");
  }

  const { verificationToken } = isValidToken(token, "refresh");

  const user = await User.findOne({ verificationToken });

  if (user === null) {
    throw HttpError(401, "Invalid token");
  }

  if (user.refreshToken !== token) {
    throw HttpError(401, "Invalid token");
  }

  const newTokens = createToken(verificationToken);

  await User.findOneAndUpdate({ verificationToken }, { ...newTokens });

  res.json({ message: "Refresh token is success", ...newTokens });
};

export const authControllers = {
  signUp: ctrWrapper(signUp),
  signIn: ctrWrapper(signIn),
  logout: ctrWrapper(logout),
  refresh: ctrWrapper(refresh),
};
