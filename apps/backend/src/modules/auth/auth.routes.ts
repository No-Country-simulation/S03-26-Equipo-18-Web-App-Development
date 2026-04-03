import { Router } from "express";
import { GetMeController, LoginController } from "./auth.controller";
import { authenticateJwt } from "../../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/login", LoginController);
authRouter.get("/me", authenticateJwt, GetMeController);

export default authRouter;