// src/modules/users/users.service.ts
import { Prisma, Role } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { AppError } from "../../shared/utils/AppError";

type ListUsersFilters = {
  role?: Role;
  isActive?: boolean;
  search?: string;
};

type UpdateUserInput = {
  name?: string;
  email?: string;
  role?: Role;
  organization?: string | null;
  isActive?: boolean;
};

const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  organization: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export async function listUsers(filters: ListUsersFilters) {
  const where: Prisma.UserWhereInput = {
    ...(filters.role ? { role: filters.role } : {}),
    ...(typeof filters.isActive === "boolean" ? { isActive: filters.isActive } : {}),
    ...(filters.search
      ? {
          OR: [
            { name: { contains: filters.search, mode: "insensitive" } },
            { email: { contains: filters.search, mode: "insensitive" } },
            { organization: { contains: filters.search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  return prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: publicUserSelect,
  });
}

export async function updateUserById(id: string, input: UpdateUserInput) {
  const existingUser = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true },
  });

  if (!existingUser) {
    throw new AppError(404, "USER_NOT_FOUND", "Usuario no encontrado");
  }

  if (input.email && input.email !== existingUser.email) {
    const emailInUse = await prisma.user.findUnique({
      where: { email: input.email },
      select: { id: true },
    });

    if (emailInUse) {
      throw new AppError(409, "EMAIL_IN_USE", "El email ya está en uso");
    }
  }

  return prisma.user.update({
    where: { id },
    data: {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.email !== undefined ? { email: input.email } : {}),
      ...(input.role !== undefined ? { role: input.role } : {}),
      ...(input.organization !== undefined ? { organization: input.organization } : {}),
      ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
    },
    select: publicUserSelect,
  });
}

export async function deleteUserById(id: string, currentUserId?: string) {
  const existingUser = await prisma.user.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existingUser) {
    throw new AppError(404, "USER_NOT_FOUND", "Usuario no encontrado");
  }

  if (currentUserId && id === currentUserId) {
    throw new AppError(400, "CANNOT_DELETE_SELF", "No puedes eliminar tu propio usuario");
  }

  await prisma.user.delete({
    where: { id },
  });

  return { message: "Usuario eliminado correctamente" };
}