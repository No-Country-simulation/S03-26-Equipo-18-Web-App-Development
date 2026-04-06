import { Router } from "express";
import { TestimonialController } from "./testimonial.controller";

const router = Router();
const controller = new TestimonialController();

router.get("/", (req, res, next) => controller.list(req, res, next));
router.get("/:id", (req, res, next) => controller.getById(req, res, next));
router.patch("/:id/estado", (req, res, next) => controller.updateEstado(req, res, next));
router.put("/:id", (req, res, next) => controller.update(req, res, next));
router.delete("/:id", (req, res, next) => controller.remove(req, res, next));

export default router;
