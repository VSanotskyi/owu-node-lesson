import { RoleEnum } from "../enums/roleEnum";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: RoleEnum;
  isDeleted: boolean;
  verificationToken: string;
  accessToken: string;
  refreshToken: string;
}
