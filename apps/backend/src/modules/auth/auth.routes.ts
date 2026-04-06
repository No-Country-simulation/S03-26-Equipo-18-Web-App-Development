import { Router } from "express";
import { GetMeController, LoginController, RegisterController } from "./auth.controller";
import { authenticateJwt, authorizeRoles } from "../../middlewares/auth.middleware";

const authRouter = Router();
    
authRouter.post("/login", LoginController);
authRouter.get("/me", authenticateJwt, GetMeController);
authRouter.post('/register', authenticateJwt, authorizeRoles('ADMIN'), RegisterController);

export default authRouter;