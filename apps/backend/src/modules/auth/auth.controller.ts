import type { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.schema";
import { getCurrentUser, loginUser, registerUser } from "./auth.service";
import { AppError } from "../../shared/utils/AppError";
import z from "zod";
import { AppJwtPayload } from "../../shared/utils/jwt";

type AuthenticatedRequest = Request & {
  user?: AppJwtPayload;
};

export async function LoginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsedBody = loginSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return next(
        new AppError(
          400,
          "VALIDATION_ERROR",
          "Datos Invalidos",
          z.treeifyError(parsedBody.error),
        ),
      );
    }
    const result = await loginUser(parsedBody.data);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

export async function GetMeController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authReq = req as AuthenticatedRequest;

    if (!authReq.user?.sub) {
      return next(
        new AppError(401, "AUTH_INVALID_TOKEN", "Token inválido o expirado"),
      );
    }

    const user = await getCurrentUser(authReq.user.sub);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
}

export async function RegisterController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsedBody = registerSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next(
        new AppError(
          400,
          "VALIDATION_ERROR",
          "Datos inválidos",
          z.treeifyError(parsedBody.error),
        ),
      );
    }

    const { role } = parsedBody.data;
    const authReq = req as AuthenticatedRequest;

    // Solo se requiere token si se va a crear un VISITOR o EDITOR
    if (role && role !== "ADMIN") {
      if (!authReq.user) {
        return next(
          new AppError(
            401,
            "AUTH_INVALID_TOKEN",
            "Token requerido para este rol",
          ),
        );
      }

      if (authReq.user.role !== "ADMIN") {
        return next(
          new AppError(
            403,
            "FORBIDDEN",
            "No tienes permisos para registrar este rol",
          ),
        );
      }
    }

    if (!authReq.user) {
      return next(new AppError(401, "AUTH_INVALID_TOKEN", "Token requerido"));
    }

    const result = await registerUser(parsedBody.data, authReq.user);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("REGISTER ERROR 👉", error);
    return next(error);
  }
}
