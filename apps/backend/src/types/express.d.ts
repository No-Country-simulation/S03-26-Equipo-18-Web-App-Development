// src/types/express.d.ts
import type { AppJwtPayload } from '../shared/utils/jwt';

declare module "express-serve-static-core" {
  interface Request {
    user?: AppJwtPayload;
  }
}

export {};