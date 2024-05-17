import { NextFunction, Request, Response } from "express";

import { ctrWrapper } from "../helpers/ctrWrapper";
import { HttpError } from "../helpers/HttpError";
import { IUser } from "../interfaces/userInterface";
import { User } from "../models/userModel";

const getAll = async (_: Request, res: Response) => {
  const users = await User.find();

  res.json(users);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (user === null) {
    throw HttpError(404);
  }

  res.json(user);
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dto = req.body as Partial<IUser>;

  const user = await User.findByIdAndUpdate(id, dto);

  if (user === null) {
    throw HttpError(404);
  }

  res.status(200).json(user);
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  res.status(200).json({ message: "delete is success" });
};

export const userController = {
  getAll: ctrWrapper(getAll),
  getById: ctrWrapper(getById),
  update: ctrWrapper(update),
  remove: ctrWrapper(remove),
};
