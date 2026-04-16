// src/modules/users/users.routes.ts
import { Router } from "express";
import { getUsers, patchUser, removeUser } from "./users.controller";
import { authenticateJwt } from "../../middlewares/auth.middleware";
import { authorizeRoles } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authenticateJwt);

// Solo ADMIN puede listar, actualizar y borrar usuarios
router.get("/", authorizeRoles("ADMIN"), getUsers);
router.patch("/:id", authorizeRoles("ADMIN"), patchUser);
router.delete("/:id", authorizeRoles("ADMIN"), removeUser);

export default router;