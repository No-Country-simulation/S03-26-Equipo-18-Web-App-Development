// src/types/express.d.ts
import type { AppJwtPayload } from "../shared/utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: AppJwtPayload;
    }
  }
}

export {};