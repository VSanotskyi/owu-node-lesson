import { Router } from "express";

import { authRouter } from "./authRouter";
import { userRouter } from "./userRouter";

const router = Router();

router.use("/users", authRouter);
router.use("/users", userRouter);

export { router };
