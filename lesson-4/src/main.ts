import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./api-error";
import { userRouter } from "./routers/user.router";

const PORT = 8080;

const app = express();
app.use(express.json());

app.use("/users", userRouter);

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({ message: err.message });
    return;
  },
);

process.on("uncaughtException", (err) => {
  console.error(err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log("Server start on port 8080");
});
