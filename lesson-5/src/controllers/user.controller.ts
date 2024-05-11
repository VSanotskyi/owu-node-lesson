import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";
import { IUser } from "../user.iterface";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();

    res.json(users);
  } catch (e) {
    next(e);
  }
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = req.body as Partial<IUser>;

    const newUser = await userService.addUser(dto);

    res.status(201).json(newUser);
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    res.json(user);
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const dto = req.body as Partial<IUser>;

    const user = await userService.updateUser(dto, id);

    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await userService.deleteUser(id);

    res.status(200).json({ message: "delete is success" });
  } catch (e) {
    next(e);
  }
};

export const userController = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
