import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);

userRouter.post("/", userController.addUser);

userRouter.get("/:id", commonMiddleware.isValidId, userController.getUserById);

userRouter.put("/:id", commonMiddleware.isValidId, userController.updateUser);

userRouter.delete(
  "/:id",
  commonMiddleware.isValidId,
  userController.deleteUser,
);

export { userRouter };
