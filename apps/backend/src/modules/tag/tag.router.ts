import { Router } from "express";
import { TagController } from "./tag.controller";
import { authenticateJwt, authorizeRoles } from "../../middlewares/auth.middleware";


const router = Router();
const controller = new TagController();

router.get("/", authenticateJwt, authorizeRoles('ADMIN'), (req, res, next) => controller.list(req, res, next));
router.get("/:id", authenticateJwt, authorizeRoles('ADMIN'), (req, res, next) => controller.getById(req, res, next));
router.post("/", authenticateJwt, authorizeRoles('ADMIN'), (req, res, next) => controller.create(req, res, next));
router.put("/:id", authenticateJwt, authorizeRoles('ADMIN'), (req, res, next) => controller.update(req, res, next));
router.delete("/:id", authenticateJwt, authorizeRoles('ADMIN'), (req, res, next) => controller.delete(req, res, next));

export default router;