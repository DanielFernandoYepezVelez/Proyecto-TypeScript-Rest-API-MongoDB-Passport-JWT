import "./libs/mongoose";

import express, { Application } from "express";
import morgan from "morgan";

import authRouter from "./routes/auth.routes";

class App {
  constructor(private app: Application) {}

  public settings() {
    this.app.set("port", process.env.PORT || 3000);
  }

  public middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  public routes() {
    this.app.use("/api", authRouter);
  }

  public async start(): Promise<void> {
    try {
      const port = await this.app.listen(this.app.get("port"));

      if (port) {
        console.log(`Sever On Port ${this.app.get("port")}`);
      }
    } catch {
      console.log("Port No Exist!");
    }
  }
}

export const app = new App(express());
