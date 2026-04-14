import { tr } from 'zod/locales';
import { prisma } from '../../config/prisma';
import { AppError } from '../../shared/utils/AppError';
import type { CreateCategoryInput, UpdateCategoryInput } from './categories.schema';

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeDescription(description?: string | null): string | null {
  if (description === undefined || description === null) return null;

  const trimmed = description.trim();
  return trimmed.length ? trimmed : null;
}

async function ensureUniqueName(name: string, excludeId?: string): Promise<void> {
  const existing = await prisma.category.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive',
      },
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });

  if (existing) {
    throw new AppError(
      409,
      'CATEGORY_NAME_ALREADY_EXISTS',
      'Ya existe una categoría con ese nombre'
    );
  }
}

async function ensureUniqueSlug(slug: string, excludeId?: string): Promise<void> {
  const existing = await prisma.category.findFirst({
    where: {
      slug: {
        equals: slug,
        mode: 'insensitive',
      },
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });

  if (existing) {
    throw new AppError(
      409,
      'CATEGORY_SLUG_ALREADY_EXISTS',
      'Ya existe una categoría con ese slug'
    );
  }
}

export async function findAllCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      isSystem: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          testimonials: true,
        },
      },
    },
  });
}

export async function findCategoryById(id: string) {
  const category = await prisma.category.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      isSystem: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          testimonials: true,
        },
      },
    },
  });

  if (!category) {
    throw new AppError(404, 'CATEGORY_NOT_FOUND', 'Categoría no encontrada');
  }

  return category;
}

export async function createCategory(data: CreateCategoryInput) {
  const name = data.name.trim();
  const slug = slugify(data.slug?.trim() || name);
  const description = normalizeDescription(data.description);

  if (!slug) {
    throw new AppError(400, 'INVALID_CATEGORY_SLUG', 'No fue posible generar un slug válido');
  }

  await ensureUniqueName(name);
  await ensureUniqueSlug(slug);

  return prisma.category.create({
    data: {
      name,
      slug,
      description,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          testimonials: true,
        },
      },
    },
  });
}

export async function updateCategory(id: string, data: UpdateCategoryInput) {
  const existingCategory = await prisma.category.findUnique({
    where: { id },
    select: { id: true, isSystem: true },
  });

  if (!existingCategory) {
    throw new AppError(404, 'CATEGORY_NOT_FOUND', 'Categoría no encontrada');
  }

  if (existingCategory.isSystem && (data.name !== undefined || data.slug !== undefined)) {
    throw new AppError(
      409,
      'CATEGORY_SYSTEM_IMMUTABLE',
      'No se puede modificar el nombre o slug de una categoría base del sistema'
    );
  }

  const updateData: {
    name?: string;
    slug?: string;
    description?: string | null;
  } = {};

  if (data.name !== undefined) {
    const name = data.name.trim();
    await ensureUniqueName(name, id);
    updateData.name = name;
  }

  if (data.slug !== undefined) {
    const slug = slugify(data.slug.trim());

    if (!slug) {
      throw new AppError(400, 'INVALID_CATEGORY_SLUG', 'El slug enviado no es válido');
    }

    await ensureUniqueSlug(slug, id);
    updateData.slug = slug;
  }

  if (data.description !== undefined) {
    updateData.description = normalizeDescription(data.description);
  }

  return prisma.category.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      createdAt: true,
      _count: {
        select: {
          testimonials: true,
        },
      },
    },
  });
}

export async function deleteCategory(id: string) {
  const existingCategory = await prisma.category.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      isSystem: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!existingCategory) {
    throw new AppError(404, 'CATEGORY_NOT_FOUND', 'Categoría no encontrada');
  }

  if (existingCategory.isSystem) {
    throw new AppError(
      409,
      'CATEGORY_SYSTEM_PROTECTED',
      'No se puede eliminar una categoría base del sistema'
    );
  }

  const testimonialsCount = await prisma.testimonial.count({
    where: { categoryId: id },
  });

  if (testimonialsCount > 0) {
    throw new AppError(
      409,
      'CATEGORY_HAS_TESTIMONIALS',
      'No se puede eliminar la categoría porque tiene testimonios asociados',
      { testimonialsCount }
    );
  }

  await prisma.category.delete({
    where: { id },
  });

  return existingCategory;
}