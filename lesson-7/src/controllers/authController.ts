import * as crypto from "node:crypto";

import bcrypto from "bcrypt";
import { Request, Response } from "express";
import nodemailer from "nodemailer";

import { ctrWrapper } from "../helpers/ctrWrapper";
import { HttpError } from "../helpers/HttpError";
import { createToken, isValidToken } from "../helpers/jwtWrapper";
import { User } from "../models/userModel";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_TRAP_USER,
    pass: process.env.MAIL_TRAP_PASS,
  },
});

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

  await transport.sendMail({
    to: normalizeEmail,
    from: "vsanotskyi@gmailo.com",
    html: `To confirm you registration please click on the <a href="http://localhost:8080/users/verify/${verificationToken}">Link</a>`,
    text: `To confirm you registration please open the link http://localhost:8080/users/verify/${verificationToken}`,
  });

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

const verify = async (req: Request, res: Response) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (user === null) {
    throw HttpError(404);
  }

  await User.findByIdAndUpdate(user._id, { verify: true });

  res.json({ message: "Email confirm successfully" });
};

export const authControllers = {
  signUp: ctrWrapper(signUp),
  signIn: ctrWrapper(signIn),
  logout: ctrWrapper(logout),
  refresh: ctrWrapper(refresh),
  verify: ctrWrapper(verify),
};
