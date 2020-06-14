import { Request, Response } from "express";

class SpecialController {
  public async special(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      /* Aqui Tengo El Valor Del Payload-JWT */
      const userToken = req.user;
      console.log(req.user);
      console.log(userToken);

      return res.json({
        ok: true,
        message:
          "Puedes Acceder A lA Ruta Special, Por Que El Middleware Válido Correctamente La Autenticación",
      });
    } catch (error) {
      return res.json({
        ok: false,
        message: error,
      });
    }
  }
}

export const specialController = new SpecialController();
