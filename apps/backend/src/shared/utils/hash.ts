// src/utils/hash.ts
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Genera un hash seguro a partir de una contraseña en texto plano.
 */
export async function hashPassword(plainPassword: string): Promise<string> {
  if (!plainPassword) {
    throw new Error('La contraseña es requerida para generar el hash');
  }

  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

/**
 * Compara una contraseña en texto plano contra un hash almacenado.
 */
export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  if (!plainPassword || !hashedPassword) {
    return false;
  }

  return bcrypt.compare(plainPassword, hashedPassword);
}