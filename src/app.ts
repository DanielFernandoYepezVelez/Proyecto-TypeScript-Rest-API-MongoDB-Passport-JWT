import dotenv from "dotenv";
dotenv.config();
import "./libs/mongoose";

import express, { Application } from "express";
import passport from "passport";
import morgan from "morgan";

import authRouter from "./routes/auth.routes";
import specialRouter from "./routes/special.routes";

/* Libreria Con La Estrategia */
import { passportJwt } from "./libs/passport-jwt";

class App {
  constructor(private app: Application) {}

  public settings() {
    this.app.set("port", process.env.PORT || 3000);
  }

  public middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    // this.app.use(passport.initialize()); /* No Es Necesario */
    passport.use(
      passportJwt.nuevaStrategia()
    ); /* Aqui Paso Toda La New Strategy */
  }

  public routes() {
    this.app.use("/api", authRouter);
    this.app.use("/api", specialRouter);
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
