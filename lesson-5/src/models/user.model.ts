import mongoose from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { IUser } from "../user.iterface";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: RoleEnum,
      default: RoleEnum.USER,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export const User = mongoose.model<IUser>("User", userSchema);
