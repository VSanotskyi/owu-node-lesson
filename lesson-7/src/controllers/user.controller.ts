import { NextFunction, Request, Response } from "express";

import { ctrWrapper } from "../helpers/ctrWrapper";
import { IUser } from "../interfaces/user.iterface";
import { userService } from "../services/user.service";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await userService.getAllUsers();

  res.json(users);
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const dto = req.body as Partial<IUser>;

  const newUser = await userService.addUser(dto);

  res.status(201).json(newUser);
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  res.json(user);
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const dto = req.body as Partial<IUser>;

  const user = await userService.updateUser(dto, id);

  res.status(200).json(user);
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  await userService.deleteUser(id);

  res.status(200).json({ message: "delete is success" });
};

export const userController = {
  addUser: ctrWrapper(addUser),
  getAllUsers: ctrWrapper(getAllUsers),
  getUserById: ctrWrapper(getUserById),
  updateUser: ctrWrapper(updateUser),
  deleteUser: ctrWrapper(deleteUser),
};
