// src/middlewares/auth.middleware.ts

import type { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/utils/AppError";
import { AppJwtPayload, verifyAccessToken } from "../shared/utils/jwt";

type AuthenticatedRequest = Request & {
  user?: AppJwtPayload;
};

export function authenticateJwt(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return next(
                new AppError(401, "AUTH_MISSING_TOKEN", 'Token no proporcionado')
            );
        }

        if (!authHeader.startsWith("Bearer ")) {
            return next(
                new AppError(401, "AUTH_INVALID_TOKEN", 'Formato de token inválido')
            );
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return next(
                new AppError(401, 'AUTH_INVALID_TOKEN', 'Token no proporcionado')
            );
        }

        const decoded = verifyAccessToken(token);
        
        (req as AuthenticatedRequest).user = decoded; // Asignar el payload decodificado al objeto req para su uso en rutas protegidas

        next();
        
    }   catch {
        return next(
            new AppError(401, "AUTH_INVALID_TOKEN", 'Token inválido o expirado')
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
        new AppError(403, 'AUTH_FORBIDDEN', `No tienes permisos para realizar esta acción, solo un ${allowedRoles.join(', ')} puede realizar esta acción`)
      );
    }

    return next();
  };
}