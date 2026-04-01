import { Router } from "express";
import { TestimonialController } from "./testimonial.controller";

const router = Router();
const controller = new TestimonialController();

router.get("/", (req, res, next) => controller.list(req, res, next));

export default router;
