import jwt from "jsonwebtoken";

import { IUser } from "../interface/IUser";

export class Jwt {
  public createToken(user: IUser) {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY || "token_para_desarrollo",
      {
        expiresIn: "48h",
      }
    );

    return token;
  }
}
