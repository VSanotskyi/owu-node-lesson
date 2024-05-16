import { Router } from "express";

import { userController } from "../controllers/userController";
import { validateBody } from "../helpers/validateBody";
import { isValidId } from "../helpers/validateId";
import { auth } from "../middlewares/auth";
import { updateUserSchema } from "../models/userModel";

const userRouter = Router();

userRouter.get("/", auth, userController.getAll);

userRouter.get("/:id", isValidId, userController.getById);

userRouter.put(
  "/:id",
  isValidId,
  validateBody(updateUserSchema),
  userController.update,
);

userRouter.delete("/:id", isValidId, userController.remove);

export { userRouter };
