import { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/utils/AppError";
import { sendError, sendSuccess } from "../../shared/utils/api-response";
import {
    createTagSchema,
    listTagsQuerySchema,
    tagIdParamSchema,
    updateTagSchema,
} from "./tag.schema";
import { TagService } from "./tag.service";

const service = new TagService();

export class TagController {
    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = listTagsQuerySchema.safeParse(req.query);

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
            const parsed = tagIdParamSchema.safeParse(req.params);

            if (!parsed.success) {
                return sendError(
                    res,
                    400,
                    "VALIDATION_ERROR",
                    "Invalid tag id",
                    parsed.error.flatten()
                );
            }

            const tag = await service.getById(parsed.data.id);

            if (!tag) {
                return sendError(res, 404, "TAG_NOT_FOUND", "Tag not found");
            }

            return sendSuccess(res, tag);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = createTagSchema.safeParse(req.body);

            if (!parsed.success) {
                return sendError(
                    res,
                    400,
                    "VALIDATION_ERROR",
                    "Invalid tag data",
                    parsed.error.flatten()
                );
            }

            const created = await service.create(parsed.data);

            return sendSuccess(res, created, undefined, 201);
        } catch (error) {
            if (error instanceof AppError) {
                return sendError(res, error.statusCode, error.code, error.message, error.details);
            }

            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const paramsParsed = tagIdParamSchema.safeParse(req.params);
            const bodyParsed = updateTagSchema.safeParse(req.body);

            if (!paramsParsed.success) {
                return sendError(
                    res,
                    400,
                    "VALIDATION_ERROR",
                    "Invalid tag id",
                    paramsParsed.error.flatten()
                );
            }

            if (!bodyParsed.success) {
                return sendError(
                    res,
                    400,
                    "VALIDATION_ERROR",
                    "Invalid tag data",
                    bodyParsed.error.flatten()
                );
            }

            const updated = await service.update(paramsParsed.data.id, bodyParsed.data);

            return sendSuccess(res, updated);
        } catch (error) {
            if (error instanceof AppError) {
                return sendError(res, error.statusCode, error.code, error.message, error.details);
            }

            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = tagIdParamSchema.safeParse(req.params);

            if (!parsed.success) {
                return sendError(
                    res,
                    400,
                    "VALIDATION_ERROR",
                    "Invalid tag id",
                    parsed.error.flatten()
                );
            }

            await service.remove(parsed.data.id);

            return res.status(204).send();
        } catch (error) {
            if (error instanceof AppError) {
                return sendError(res, error.statusCode, error.code, error.message, error.details);
            }

            next(error);
        }
    }
}