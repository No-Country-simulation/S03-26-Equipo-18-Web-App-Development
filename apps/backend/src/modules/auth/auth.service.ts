import { prisma } from '../../config/prisma';
import type { LoginInput } from './auth.schema';
import { AppError } from '../../shared/utils/AppError';
import { comparePassword } from '../../shared/utils/hash';
import { AppJwtPayload, signAccessToken } from '../../shared/utils/jwt';


type PublicUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
};

type LoginResponse = {
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
  active: boolean;
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    active: user.active,
  };
}

async function findActiveUserByEmail(email: string) {

    const user = await prisma.user.findUnique({ where: { email } });


    if (!user) {
        throw new AppError(401, 'AUTH_INVALID_CREDENTIALS', 'Invalid email or password');
    }

    if (!user.active) {
        throw new AppError(403, 'USER_INACTIVE', 'El usuario está inactivo');
    }

    return user;
}

export async function loginUser(input: LoginInput): Promise<LoginResponse> {
    const user = await findActiveUserByEmail(input.email);
    
    if (!user) {
        throw new AppError(401, 'AUTH_INVALID_CREDENTIALS', 'Invalid email or password');
    }

    if (!user.active) {
    throw new AppError(403, 'USER_INACTIVE', 'El usuario está inactivo');
    }

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
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new AppError(404, 'USER_NOT_FOUND', 'Usuario no encontrado');
    }

    if (!user.active) {
        throw new AppError(403, 'USER_INACTIVE', 'El usuario está inactivo');
    }

    return toPublicUser(user);
}