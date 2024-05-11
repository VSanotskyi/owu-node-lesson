import { ApiError } from "../api-error";
import { User } from "../models/user.model";
import { IUser } from "../user.iterface";

const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

const addUser = async (dto: Partial<IUser>): Promise<IUser> => {
  return await User.create(dto);
};

const getUserById = async (id: string): Promise<IUser> => {
  const user = await User.findById(id);

  if (user === null) {
    throw new ApiError("User not found", 404);
  }

  return user;
};

const updateUser = async (dto: Partial<IUser>, id: string): Promise<IUser> => {
  const user = await User.findByIdAndUpdate(id, dto, { new: true });

  if (user === null) {
    throw new ApiError("User not found", 404);
  }

  return user;
};

const deleteUser = async (id: string): Promise<void> => {
  const user = await User.findByIdAndDelete(id);

  if (user === null) {
    throw new ApiError("User not found", 404);
  }
};

export const userRepository = {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
};
