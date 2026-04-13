import { AppError } from "../../shared/utils/AppError";
import { Request, Response, NextFunction } from "express";
import z from "zod";
import { TestimonialService } from "./testimonial.service";
import {
    listTestimonialsQuerySchema,
    getTestimonioByIdParamsSchema,
    updateStatusParamsSchema,
} from "./testimonials.schema";
import {
    testimonialIdParamSchema,
    updateTestimonialSchema,
    updateTestimonialStatusSchema,
} from "./testimonials.schema";
import { sendSuccess, sendError } from "../../shared/utils/api-response";

const service = new TestimonialService();

export class TestimonialController {
    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = listTestimonialsQuerySchema.safeParse(req.query);

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

            return sendSuccess(res, result.items, {
                total: result.total,
                page: result.page,
                limit: result.limit,
                totalPages: result.totalPages,
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const paramsParsed = getTestimonioByIdParamsSchema.safeParse(req.params);

            if (!paramsParsed.success) {
                return sendError(
                    res,
                    400,
                    "VALIDATION_ERROR",
                    "Invalid params",
                    paramsParsed.error.flatten()
                );
            }

            const testimonial = await service.getById(paramsParsed.data.id);

            if (!testimonial) {
                return sendError(
                    res,
                    404,
                    "TESTIMONIAL_NOT_FOUND",
                    "Testimonial not found"
                );
            }

            return sendSuccess(res, testimonial);
        } catch (error) {
            next(error);
        }
    }

    async updateStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const paramsParsed = updateStatusParamsSchema.safeParse(req.params);
            const bodyParsed = updateTestimonialStatusSchema.safeParse(req.body);

            if (!paramsParsed.success || !bodyParsed.success) {
                return sendError(
                    res,
                    400,
                    "VALIDATION_ERROR",
                    "Invalid data",
                    {
                        params: paramsParsed.success ? undefined : paramsParsed.error.flatten(),
                        body: bodyParsed.success ? undefined : bodyParsed.error.flatten(),
                    }
                );
            }

            const updated = await service.updateStatus(
                paramsParsed.data.id,
                bodyParsed.data
            );

            return sendSuccess(res, updated, undefined, 200);
        } catch (error) {
            if (error instanceof AppError) {
                return sendError(res, error.statusCode, error.code, error.message, error.details);
            }
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const paramsParsed = testimonialIdParamSchema.safeParse(req.params);
            const bodyParsed = updateTestimonialSchema.safeParse(req.body);

            if (!paramsParsed.success) {
                return sendError(
                    res,
                    400,
                    "VALIDATION_ERROR",
                    "Invalid testimonial id",
                    paramsParsed.error.flatten()
                );
            }

            if (!bodyParsed.success) {
                return sendError(
                    res,
                    400,
                    "VALIDATION_ERROR",
                    "Invalid testimonial data",
                    bodyParsed.error.flatten()
                );
            }

            const updated = await service.update(
                paramsParsed.data.id,
                bodyParsed.data
            );

            return sendSuccess(res, updated, undefined, 200);
        } catch (error) {
            if (error instanceof AppError) {
                return sendError(res, error.statusCode, error.code, error.message, error.details);
            }
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const paramsParsed = testimonialIdParamSchema.safeParse(req.params);

            if (!paramsParsed.success) {
                return sendError(
                    res,
                    400,
                    "VALIDATION_ERROR",
                    "Invalid testimonial id",
                    paramsParsed.error.flatten()
                );
            }

            await service.remove(paramsParsed.data.id);

            return res.status(204).send();
        } catch (error) {
            if (error instanceof AppError) {
                return sendError(res, error.statusCode, error.code, error.message, error.details);
            }
            next(error);
        }
    }
}