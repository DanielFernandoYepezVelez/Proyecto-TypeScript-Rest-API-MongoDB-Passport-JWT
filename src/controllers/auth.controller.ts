import { Request, Response } from "express";

import User from "../models/User";
import { IUser } from "../interface/User";
import { createToken } from "../helpers/jwt";

class AuthController {
  public async signup(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const { email, password } = req.body;

      const validateEmail = await User.findOne({ email });

      if (validateEmail) {
        return res.status(400).json({
          ok: false,
          msg: "El Correo Ya Existe En La BD",
        });
      }

      const user: IUser = new User({
        email,
        password,
      });

      await user.save();

      return res.json({
        ok: true,
        msg: "User Saved Successfuly",
        user,
      });
    } catch {
      return res.status(400).json({
        ok: false,
        msg: "No Se Guardo El Usuario Correctamente",
      });
    }
  }

  public async signin(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          ok: false,
          msg: "El Correo No Existe En La BD",
        });
      }

      const validatePassword = await user.validatePassword(password);

      if (!validatePassword) {
        return res.status(400).json({
          ok: false,
          msg: "La Contraseña No Es Válida",
        });
      }

      return res.json({
        ok: true,
        msg: "User Loggued Successfuly",
        token: createToken(user),
      });
    } catch {
      return res.status(400).json({
        ok: false,
        msg: "No Se Inicio Sesión Correctamente",
      });
    }
  }
}

export const authController = new AuthController();
