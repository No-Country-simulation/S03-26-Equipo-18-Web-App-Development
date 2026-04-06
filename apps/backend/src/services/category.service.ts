import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const CategoryService = {

  async getAll() {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
  },

  async create(data: { name: string; slug: string; description?: string }) {
    return await prisma.category.create({
      data
    });
  },

async actualizar(id: string, data: { name?: string, slug?: string, description?: string }) {
  return await prisma.category.update({ // 👈 Usá el modelo 'category', no el intermedio
    where: { id: id },
    data: data
  });
},

  async delete(id: string) {
    return await prisma.category.delete({
      where: { id }
    });
  }
};