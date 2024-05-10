import { ApiError } from "../api-error";
import { readUsers, writeUsers } from "../fs.service";
import { IUser } from "../user.iterface";

const getAllUsers = async (): Promise<IUser[]> => {
  return await readUsers();
};

const getUserById = async (id: string): Promise<IUser> => {
  const users = await readUsers();
  const user = users.find((el) => el.id.toString() === id);

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  return user;
};

const writeList = async (dto: Partial<IUser>): Promise<IUser> => {
  const { email, name, password } = dto;

  const users = await readUsers();

  const id = (Number(users[users.length - 1].id) + 1).toString();

  const newUser = {
    id,
    email,
    name,
    password,
  };

  users.push(newUser);

  await writeUsers(users);

  return newUser;
};

const updateUser = async (dto: IUser): Promise<void> => {
  const users = await readUsers();

  const index = users.findIndex((el) => el.id.toString() === dto.id);

  if (index === -1) {
    throw new ApiError("User not found", 404);
  }

  users[index] = dto;

  await writeUsers(users);
};

const deleteUser = async (id: string): Promise<void> => {
  const users = await readUsers();

  const index = users.findIndex((el) => el.id === id);

  if (index === -1) {
    throw new ApiError("User not found", 404);
  }

  users.splice(index, 1);

  await writeUsers(users);
};

export const userRepository = {
  getAllUsers,
  writeList,
  updateUser,
  deleteUser,
  getUserById,
};
