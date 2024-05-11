import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { bodySchema } from "../models/user.model";

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);

userRouter.post(
  "/",
  commonMiddleware.validateBody(bodySchema),
  userController.addUser,
);

userRouter.get("/:id", commonMiddleware.isValidId, userController.getUserById);

userRouter.put(
  "/:id",
  commonMiddleware.isValidId,
  commonMiddleware.validateBody(bodySchema),
  userController.updateUser,
);

userRouter.delete(
  "/:id",
  commonMiddleware.isValidId,
  userController.deleteUser,
);

export { userRouter };
