import * as crypto from "node:crypto";

import bcrypto from "bcrypt";
import { NextFunction, Request, Response } from "express";

import { createJwt } from "../helpers/createJwt";
import { ctrWrapper } from "../helpers/ctrWrapper";
import { HttpError } from "../helpers/HttpError";
import { User } from "../models/userModel";

const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const dto = req.body;
  const normalizeEmail = dto.email.toLowerCase();
  const user = await User.findOne({ email: normalizeEmail });

  if (user) {
    throw HttpError(409);
  }

  const passwordHash = await bcrypto.hash(dto.password, 10);

  const verificationToken = crypto.randomUUID();

  const token = createJwt(verificationToken);

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

  const token = createJwt(user.verificationToken);

  await User.findByIdAndUpdate(user._id, { ...token });

  res.json(token);
};

const logout = async (req: Request, res: Response) => {
  const { verificationToken } = req.body;

  await User.findOneAndUpdate(
    { verificationToken },
    { accessToken: null, refreshToken: null },
  );

  res.status(204).end();
};

export const authControllers = {
  signUp: ctrWrapper(signUp),
  signIn: ctrWrapper(signIn),
  logout: ctrWrapper(logout),
};
