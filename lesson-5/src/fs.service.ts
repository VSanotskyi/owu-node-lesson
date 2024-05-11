import fs from "node:fs/promises";

import path from "path";

import { IUser } from "./user.iterface";

const filePath = path.join(process.cwd(), "db.json");

const readUsers = async (): Promise<IUser[]> => {
  const users = await fs.readFile(filePath, { encoding: "utf-8" });

  return JSON.parse(users);
};

const writeUsers = async (users: IUser[]): Promise<void> => {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
};

export { readUsers, writeUsers };
