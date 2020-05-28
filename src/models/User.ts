import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

import { IUser } from "../interface/User";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password")) return next();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

userSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compareSync(password, this.password);
};

export default model<IUser>("User", userSchema);
