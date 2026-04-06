import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TagsService {
  
  static async crear(data: any) {
    return await prisma.tag.create({ 
      data 
    });
  }

  static async obtenerTodos() {
    return await prisma.tag.findMany({
      orderBy: { name: 'asc' }
    });
  }

  static async actualizar(id: string, data: any) {
    return await prisma.tag.update({
      where: { id },
      data
    });
  }

  static async borrar(id: string) {
    return await prisma.tag.delete({ 
      where: { id } 
    });
  }
}