import type { NextFunction, Request, Response } from "express";
import { PublicTestimonialsService } from "./public-testimonials.service";
import {
    createPublicTestimonioSchema,
    testimonialIdParamSchema,
} from "./public-testimonials.schema";
import { AppError } from "../../shared/utils/AppError";
import z from "zod";

const service = new PublicTestimonialsService();

export class PublicTestimonialsController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = createPublicTestimonioSchema.safeParse(req.body);

            if (!parsed.success) {
                return next(
                    new AppError(
                        400,
                        "VALIDATION_ERROR",
                        "Datos inválidos",
                        z.treeifyError(parsed.error)
                    )
                );
            }

            const testimonial = await service.create(parsed.data, req.file);

            return res.status(201).json({
                success: true,
                data: {
                    id: testimonial.id,
                    message: "Tu testimonio fue recibido y está pendiente de revisión",
                },
            });
        } catch (error) {
            return next(error);
        }
    }

    async incrementViews(req: Request, res: Response, next: NextFunction) {
        try {
            const parsedParams = testimonialIdParamSchema.safeParse(req.params);

            if (!parsedParams.success) {
                return next(
                    new AppError(
                        400,
                        "VALIDATION_ERROR",
                        "Parámetros inválidos",
                        z.treeifyError(parsedParams.error)
                    )
                );
            }

            const result = await service.incrementViews(parsedParams.data.id);

            return res.status(200).json({
                success: true,
                data: {
                    id: result.id,
                    views: result.views,
                    message: "Vista incrementada correctamente",
                },
            });
        } catch (error) {
            return next(error);
        }
    }

    async incrementClicks(req: Request, res: Response, next: NextFunction) {
        try {
            const parsedParams = testimonialIdParamSchema.safeParse(req.params);

            if (!parsedParams.success) {
                return next(
                    new AppError(
                        400,
                        "VALIDATION_ERROR",
                        "Parámetros inválidos",
                        z.treeifyError(parsedParams.error)
                    )
                );
            }

            const result = await service.incrementClicks(parsedParams.data.id);

            return res.status(200).json({
                success: true,
                data: {
                    id: result.id,
                    clicks: result.clicks,
                    message: "Click registrado correctamente",
                },
            });
        } catch (error) {
            return next(error);
        }
    }
}