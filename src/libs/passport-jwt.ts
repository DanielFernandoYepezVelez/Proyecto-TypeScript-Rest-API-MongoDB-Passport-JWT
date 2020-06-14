import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

import User from "../models/User";

class PassportJwt {
  private options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY || "token_para_desarrollo",
  };

  public nuevaStrategia() {
    return new Strategy(
      this.options,
      async (payloadFromJwt, done): Promise<any> => {
        /* Hago Una Consulta A La DB Por El Id Del Usuario Que Tengo En El Token, Que Guarde Anteriormente Al Momento De Crearlo En Su Respectivo Payload */
        const userDB = await User.findById(payloadFromJwt.id);

        if (userDB) {
          return done(null, userDB);
        }

        return done(null, false);
      }
    );
  }
}

export const passportJwt = new PassportJwt();
