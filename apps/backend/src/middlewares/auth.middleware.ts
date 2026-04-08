// src/middlewares/auth.middleware.ts

import type { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/utils/AppError";
import { AppJwtPayload, verifyAccessToken } from "../shared/utils/jwt";
import { extractToken } from "./utils/extractToken";

type AuthenticatedRequest = Request & {
  user?: AppJwtPayload;
};

export function authenticateJwt(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = extractToken(req);

  if (!token) {
    return next(
      new AppError(401, "AUTH_MISSING_TOKEN", "Token no proporcionado")
    );
  }

  try {
    (req as AuthenticatedRequest).user = verifyAccessToken(token);
    return next();
  } catch {
    return next(
      new AppError(401, "AUTH_INVALID_TOKEN", "Token inválido o expirado")
    );
  }
}

export function authorizeRoles(...allowedRoles: AppJwtPayload['role'][]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest;

    if (!authReq.user) {
      return next(
        new AppError(401, 'AUTH_UNAUTHORIZED', 'Usuario no autenticado')
      );
    }

    const userRole = authReq.user.role;

    if (!allowedRoles.includes(userRole)) {
      return next(
        new AppError(403, 'AUTH_FORBIDDEN', 'No tienes permisos para realizar esta acción, solo un administrador puede realizar esta acción')
      );
    }

    return next();
  };
}