import { Request, Response, NextFunction } from "express";
import { createPublicTestimonioSchema } from "./public-testimonials.schema";
import { PublicTestimoniosService } from "./public-testimonials.service";
import { sendError, sendSuccess } from "../../shared/utils/api-response";

const service = new PublicTestimoniosService();

export class PublicTestimoniosController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("=== DEBUG CREATE ===");
            console.log("req.body:", req.body);
            console.log("req.file:", req.file);
            console.log("req.headers.content-type:", req.headers["content-type"]);


            const parsed = createPublicTestimonioSchema.safeParse(req.body);

            if (!parsed.success) {
                return sendError(
                    res,
                    400,
                    "VALIDATION_ERROR",
                    "Datos inválidos",
                    parsed.error.flatten()
                );
            }

            const file = req.file;
            console.log("Calling service with type:", parsed.data.type, "file exists:", !!file);
            const testimonial = await service.create(parsed.data, file);

            return sendSuccess(
                res,
                {
                    id: testimonial.id,
                    message: "Tu testimonio fue recibido y está pendiente de revisión",
                },
                undefined,
                201
            );
        } catch (error) {
            console.error("=== ERROR CAUGHT ===");
            console.error("Error:", error);
            console.error("Error type:", typeof error);
            console.error("Error constructor:", error?.constructor?.name);
            next(error);
        }
    }
}