import { IUser } from "../interfaces/user.iterface";
import { userRepository } from "../repositories/user.repository";

const getAllUsers = async (): Promise<IUser[]> => {
  return await userRepository.getAllUsers();
};

const addUser = async (dto: Partial<IUser>): Promise<IUser> => {
  return await userRepository.addUser(dto);
};

const getUserById = async (id: string): Promise<IUser> => {
  return await userRepository.getUserById(id);
};

const updateUser = async (dto: Partial<IUser>, id: string): Promise<IUser> => {
  return await userRepository.updateUser(dto, id);
};

const deleteUser = async (id: string): Promise<void> => {
  await userRepository.deleteUser(id);
};

export const userService = {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
};
