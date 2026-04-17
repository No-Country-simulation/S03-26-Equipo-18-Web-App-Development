// src/modules/dashboard/dashboard.routes.ts

import { Router } from "express";
import { getDashboardController } from "./dashboard.controller";
import { authenticateJwt } from "../../middlewares/auth.middleware";
// si usas autorización por roles, descomenta la siguiente línea
// import { authorizeRoles } from "../../shared/middlewares/authorizeRoles";

const router = Router();

// router.get("/", authenticateJwt, authorizeRoles("ADMIN", "EDITOR"), getDashboardController);
router.get("/",    authenticateJwt, getDashboardController);

export default router;