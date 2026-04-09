import { AppError } from './../../shared/utils/app-error';
import { Request, Response, NextFunction } from "express";
import { TestimonialService } from "./testimonial.service";
import { listTestimoniosQuerySchema, getTestimonioByIdParamsSchema, updateStatusParamsSchema, updateStatusBodySchema, updateTestimonialParamsSchema, updateTestimonialBodySchema, testimonioIdParamsSchema } from "./testimonials.schema";
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
                    "TESTIMONIO_NOT_FOUND",
                    "Testimonio no encontrado"
                );
            }

            return sendSuccess(res, testimonial);
        } catch (error) {
            next(error);
        }
    }

    async updateEstado(req: Request, res: Response, next: NextFunction) {
        try {
            const paramsParsed = updateStatusParamsSchema.safeParse(req.params);
            const bodyParsed = updateStatusBodySchema.safeParse(req.body);

            if (!paramsParsed.success || !bodyParsed.success) {
                return sendError(
                    res,
                    400,
                    "VALIDATION_ERROR",
                    "Datos inválidos",
                    {
                        params: paramsParsed.error?.flatten(),
                        body: bodyParsed.error?.flatten(),
                    }
                );
            }

            const updated = await service.updateStatus(
                paramsParsed.data.id,
                bodyParsed.data
            );

            return sendSuccess(res, updated, undefined, 200);
        } catch (error: any) {
            if (error instanceof AppError) {
                return sendError(res, error.statusCode, error.code, error.message);
            }
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const paramsParsed = updateTestimonialParamsSchema.safeParse(req.params);

            if (!paramsParsed.success) {
                return sendError(
                    res,
                    400,
                    "VALIDATION_ERROR",
                    "Parámetros inválidos",
                    paramsParsed.error.flatten()
                );
            }

            const bodyParsed = updateTestimonialBodySchema.safeParse(req.body);

            if (!bodyParsed.success) {
                return sendError(
                    res,
                    400,
                    "VALIDATION_ERROR",
                    "Body inválido",
                    bodyParsed.error.flatten()
                );
            }

            const { id } = paramsParsed.data;
            const payload = bodyParsed.data;

            const updated = await service.update(id, payload);

            return sendSuccess(res, updated);
        } catch (error) {
            if (error instanceof AppError) {
                return sendError(res, error.statusCode, error.code, error.message, error.details);
            }

            next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const paramsParsed = testimonioIdParamsSchema.safeParse(req.params);

            if (!paramsParsed.success) {
                return sendError(
                    res,
                    400,
                    "VALIDATION_ERROR",
                    "Parámetros inválidos",
                    paramsParsed.error.flatten()
                );
            }

            await service.remove(paramsParsed.data.id);

            return res.status(204).send();
        } catch (error) {
            if (error instanceof AppError) {
                return sendError(
                    res,
                    error.statusCode,
                    error.code,
                    error.message,
                    error.details
                );
            }

            next(error);
        }
    }

}
