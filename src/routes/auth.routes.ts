import { Router } from "express";

import { authController } from "../controllers/auth.controller";

class AuthRoutes {
  constructor(public router: Router) {
    this.router.post("/signup", authController.signup);
    this.router.post("/signin", authController.signin);
  }
}

const authRoutes = new AuthRoutes(Router());
export default authRoutes.router;
