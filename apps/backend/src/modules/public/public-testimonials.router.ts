import { Router } from "express";
import { upload } from "../../middlewares/upload";
import { PublicTestimoniosController } from "./public-testimonials.controller";

const router = Router();
const controller = new PublicTestimoniosController();

router.post("/", upload.single("file"), (req, res, next) =>
    controller.create(req, res, next)
);

export default router;