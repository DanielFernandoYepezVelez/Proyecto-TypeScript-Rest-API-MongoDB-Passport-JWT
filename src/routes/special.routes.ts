import { Router } from "express";
import passport from "passport";

import { specialController } from "../controllers/special.controller";

class SpecialRoutes {
  constructor(public router: Router) {
    this.router.get(
      "/special",
      passport.authenticate("jwt", { session: false }),
      specialController.special
    );
  }
}

const specialRoutes = new SpecialRoutes(Router());
export default specialRoutes.router;
