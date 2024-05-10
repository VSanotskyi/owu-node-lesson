import { userRepository } from "../repositories/user.repository";
import { IUser } from "../user.iterface";

const getAllUsers = async (): Promise<IUser[]> => {
  return await userRepository.getAllUsers();
};

const getUserById = async (id: string): Promise<IUser> => {
  return await userRepository.getUserById(id);
};

const createUser = async (dto: Partial<IUser>): Promise<IUser> => {
  return await userRepository.writeList(dto);
};

const updateUser = async (dto: IUser): Promise<void> => {
  await userRepository.updateUser(dto);
};

const deleteUser = async (id: string): Promise<void> => {
  await userRepository.deleteUser(id);
};

export const userService = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
};
