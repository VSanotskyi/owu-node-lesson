import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { IError } from "./interfaces/errorInterface";
import { router } from "./routers";

const app = express();
app.use(express.json());

app.use("/", router);

app.use((_: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ message: err.message });
});

const PORT = 8080;

app.listen(PORT, async () => {
  await mongoose.connect(process.env.DB_URI);
  console.log("Server start on port 8080");
});
