import { Router } from "express";
import { GetMeController, LoginController, RegisterController} from "./auth.controller";
import { authenticateJwt, authorizeRoles } from "../../middlewares/auth.middleware";
import { authenticateJwtOptional } from "../../middlewares/authOptional.middleware";

const authRouter = Router();
    
authRouter.post("/login", LoginController);
authRouter.get("/me", authenticateJwt, GetMeController);
authRouter.post('/register', authenticateJwtOptional, RegisterController);


export default authRouter;