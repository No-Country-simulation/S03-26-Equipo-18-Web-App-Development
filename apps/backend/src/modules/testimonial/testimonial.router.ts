import { Router } from "express";
import { TestimonialController } from "./testimonial.controller";
import { authenticateJwt, authorizeRoles } from '../../middlewares/auth.middleware';

const router = Router();
const controller = new TestimonialController();

router.get("/", authenticateJwt, authorizeRoles("ADMIN", "EDITOR"), (req, res, next) => controller.list(req, res, next));
router.get("/:id", authenticateJwt, authorizeRoles("ADMIN", "EDITOR"), (req, res, next) => controller.getById(req, res, next));
router.patch("/:id/estado", authenticateJwt, authorizeRoles("ADMIN", "EDITOR"), (req, res, next) => controller.updateEstado(req, res, next));
router.put("/:id", authenticateJwt, authorizeRoles("ADMIN", "EDITOR"), (req, res, next) => controller.update(req, res, next));
router.delete("/:id", authenticateJwt, authorizeRoles("ADMIN", "EDITOR"), (req, res, next) => controller.remove(req, res, next));

export default router;
