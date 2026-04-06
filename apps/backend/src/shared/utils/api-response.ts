import { Response } from "express";

type SuccessMeta = {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
};

export function sendSuccess<T>(
    res: Response,
    data: T,
    meta?: SuccessMeta,
    statusCode = 200
) {
    return res.status(statusCode).json({
        success: true,
        data,
        ...(meta ? { meta } : {}),
    });
}

export function sendError(
    res: Response,
    statusCode: number,
    code: string,
    message: string,
    details?: unknown
) {
    return res.status(statusCode).json({
        success: false,
        error: {
            code,
            message,
            ...(details ? { details } : {}),
        },
    });
}
