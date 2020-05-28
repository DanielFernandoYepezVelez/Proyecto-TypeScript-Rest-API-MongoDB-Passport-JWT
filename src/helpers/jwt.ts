import { IUser } from "../interface/User";
import jwt from "jsonwebtoken";

export const createToken = (user: IUser) => {
  const token = jwt.sign({ id: user._id, email: user.email }, "secret_key", {
    expiresIn: "48h",
  });

  return token;
};
