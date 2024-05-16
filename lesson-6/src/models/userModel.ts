import Joi from "joi";
import mongoose from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { IUser } from "../interfaces/user.iterface";

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
    accessToken: { type: String, default: null },
    refreshToken: { type: String, default: null },
    verificationToken: { type: String, required: true },
  },
  { timestamps: false, versionKey: false },
);

const addUserSchema = Joi.object<IUser>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string(),
  role: Joi.string(),
  isDeleted: Joi.boolean(),
});

const updateUserSchema = Joi.object<IUser>({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  phone: Joi.string(),
  role: Joi.string(),
  isDeleted: Joi.boolean(),
})
  .min(1)
  .message("Body must have at least one field");

const User = mongoose.model<IUser>("User", userSchema);

export { User, addUserSchema, updateUserSchema };
