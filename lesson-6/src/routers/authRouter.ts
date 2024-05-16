import { Router } from "express";

import { authControllers } from "../controllers/authController";
import { validateBody } from "../helpers/validateBody";
import { auth } from "../middlewares/auth";
import { addUserSchema } from "../models/userModel";

const authRouter = Router();

authRouter.post(
  "/sign-up",
  validateBody(addUserSchema),
  authControllers.signUp,
);

authRouter.post("/sign-in", authControllers.signIn);

authRouter.get("/logout", auth, authControllers.logout);

export { authRouter };
