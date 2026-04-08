// src/modules/auth/auth.service.ts

import { prisma } from '../../config/prisma';
import type { LoginInput, RegisterInput } from './auth.schema';
import { AppError } from '../../shared/utils/AppError';
import { comparePassword, hashPassword } from '../../shared/utils/hash';
import { AppJwtPayload, signAccessToken } from '../../shared/utils/jwt';


type PublicUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    active: boolean;
  };
};

function toPublicUser(user: {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    active: user.isActive,
  };
}

async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

async function findActiveUserByEmail(email: string) {

    const user = await findUserByEmail(email);


    if (!user) {
        throw new AppError(401, 'AUTH_INVALID_CREDENTIALS', 'Invalid email or password');
    }

    if (!user.isActive) {
        throw new AppError(403, 'USER_INACTIVE', 'El usuario está inactivo');
    }

    return user;
}


export async function loginUser(input: LoginInput): Promise<AuthResponse> {
    const user = await findActiveUserByEmail(input.email);

    const isPasswordValid = await comparePassword(input.password, user.passwordHash);   

    if (!isPasswordValid) {
        throw new AppError(401, 'AUTH_INVALID_CREDENTIALS', 'Invalid email or password');
    }

    const payload: AppJwtPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
    };

    const token = signAccessToken(payload);

    return {
        token,
        user: toPublicUser(user),
    };
}

export async function getCurrentUser(userId: string): Promise<PublicUser> {
    const user = await findUserById(userId);

    if (!user) {
        throw new AppError(404, 'USER_NOT_FOUND', 'Usuario no encontrado');
    }

    if (!user.isActive) {
        throw new AppError(403, 'USER_INACTIVE', 'El usuario está inactivo');
    }

    return toPublicUser(user);
}

export async function registerUser(input: RegisterInput, currentUserRole?: string): Promise<AuthResponse> {
    const roleToAssign = input.role ?? 'VISITOR';

    // Solo se requiere token si el rol que se quiere crear NO es ADMIN
    if (roleToAssign !== 'ADMIN') {
        if (!currentUserRole || currentUserRole !== 'ADMIN') {
            throw new AppError(403, 'FORBIDDEN', 'No tienes permisos para registrar este rol');
        }
    }

    const existingUser = await findUserByEmail(input.email);
    if (existingUser) {
        throw new AppError(409, 'USER_ALREADY_EXISTS', 'El correo ya está registrado');
    }

    const passwordHash = await hashPassword(input.password);

    const user = await prisma.user.create({
        data: {
            name: input.name,
            email: input.email,
            passwordHash,
            role: roleToAssign,
            isActive: true,
        },
    });

    const payload: AppJwtPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
    };

    const token = signAccessToken(payload);

    return {
        token,
        user: toPublicUser(user),
    };
}