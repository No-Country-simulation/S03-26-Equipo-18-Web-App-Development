import { Request, Response, NextFunction } from "express";
import { TestimonialService } from "./testimonial.service";
import { listTestimoniosQuerySchema } from "./testimonials.schema";
import { sendSuccess, sendError } from "../../shared/utils/api-response";

const service = new TestimonialService();

export class TestimonialController {
    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = listTestimoniosQuerySchema.safeParse(req.query);

            if (!parsed.success) {
                return sendError(
                    res,
                    400,
                    "VALIDATION_ERROR",
                    "Invalid query parameters",
                    parsed.error.flatten()
                );
            }

            const result = await service.list(parsed.data);

            return sendSuccess(
                res,
                result.items,
                {
                    total: result.total,
                    page: result.page,
                    limit: result.limit,
                    totalPages: result.totalPages,
                }
            );
        } catch (error) {
            next(error);
        }
    }
}
