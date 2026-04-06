// src/utils/jwt.ts
import { Role } from '.prisma/client/default';
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';

type JwtExpiresIn = SignOptions['expiresIn'];

export interface AppJwtPayload {
  sub: string;
  email?: string;
  role: Role;
}

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Falta la variable de entorno: ${name}`);
  }

  return value;
}

const ACCESS_SECRET: Secret = getEnv('JWT_SECRET');
const REFRESH_SECRET: Secret = getEnv('JWT_REFRESH_SECRET');

const ACCESS_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '15m') as JwtExpiresIn;
const REFRESH_EXPIRES_IN = (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as JwtExpiresIn;

/**
 * Crea el access token.
 */
export function signAccessToken(payload: AppJwtPayload): string {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES_IN,
  });
}

/**
 * Crea el refresh token.
 */
export function signRefreshToken(payload: AppJwtPayload): string {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
  });
}

/**
 * Verifica y decodifica un access token.
 */
export function verifyAccessToken(token: string): AppJwtPayload {
  const decoded = jwt.verify(token, ACCESS_SECRET);

  if (typeof decoded === 'string') {
    throw new Error('Token inválido: payload inesperado');
  }

  return decoded as AppJwtPayload;
}

/**
 * Verifica y decodifica un refresh token.
 */
export function verifyRefreshToken(token: string): AppJwtPayload {
  const decoded = jwt.verify(token, REFRESH_SECRET);

  if (typeof decoded === 'string') {
    throw new Error('Refresh token inválido: payload inesperado');
  }

  return decoded as AppJwtPayload;
}