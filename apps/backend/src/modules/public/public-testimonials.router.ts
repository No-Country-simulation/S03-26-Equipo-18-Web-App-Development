import { Router } from "express";
import multer from "multer";
import { PublicTestimonialsController } from "./public-testimonials.controller";

const publicTestimonialsRouter = Router();
const controller = new PublicTestimonialsController();

const upload = multer({
    storage: multer.memoryStorage(),
});

publicTestimonialsRouter.post(
    "/",
    upload.single("file"),
    controller.create.bind(controller)
);

publicTestimonialsRouter.post(
    "/:id/views",
    controller.incrementViews.bind(controller)
);

publicTestimonialsRouter.post(
    "/:id/clicks",
    controller.incrementClicks.bind(controller)
);

export default publicTestimonialsRouter;