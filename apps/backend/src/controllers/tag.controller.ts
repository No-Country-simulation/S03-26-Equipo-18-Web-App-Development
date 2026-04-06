import { Request, Response } from "express";
import { TagsService } from "../services/tag.service";
import { CreateTagSchema } from "../schemas/tag.schema";
import { ZodError } from "zod";

export class TagsController {
  
  static async crear(req: Request, res: Response) {
    try {
      const validatedData = CreateTagSchema.parse(req.body);
      const nuevo = await TagsService.crear(validatedData);
      return res.status(201).json(nuevo);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.issues });
      }
      return res.status(500).json({ error: "Error al crear el tag (tal vez el slug ya existe)" });
    }
  }

  static async obtenerTodos(_req: Request, res: Response) {
    try {
      const tags = await TagsService.obtenerTodos();
      return res.json(tags);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener los tags" });
    }
  }

  static async actualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const validatedData = CreateTagSchema.partial().parse(req.body);
      
      const actualizado = await TagsService.actualizar(id as string, validatedData);
      return res.json(actualizado);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.issues });
      }
      return res.status(404).json({ error: "Tag no encontrado o error en la actualización" });
    }
  }

  static async borrar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await TagsService.borrar(id as string);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: "No se pudo borrar el tag o no existe" });
    }
  }
}