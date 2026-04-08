import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../shared/utils/AppError";
import { AppJwtPayload, verifyAccessToken } from "../shared/utils/jwt";
import { extractToken } from "./utils/extractToken";

type AuthenticatedRequest = Request & {
  user?: AppJwtPayload;
};

export const authenticateJwtOptional = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  const token = extractToken(req);

  if (!token) return next();

  try {
    req.user = verifyAccessToken(token);
  } catch {

  }

  return next();
};