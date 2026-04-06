import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { CreateCategorySchema } from '../schemas/category.schema'; 
import { ZodError } from 'zod';

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await CategoryService.getAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const validatedData = CreateCategorySchema.parse(req.body);

    const newCategory = await CategoryService.create(validatedData);
    
    res.status(201).json(newCategory);
  } catch (error) {

    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Datos de categoría inválidos",
        errors: error.issues.map(e => ({ path: e.path, message: e.message }))
      });
    }

    res.status(500).json({ 
      error: 'Error al crear la categoría (quizás el slug ya existe)' 
    });
  }
};

  export const updateCategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {name, slug, description} = CreateCategorySchema.parse(req.body);

      const categoriaActualizada = await CategoryService.actualizar(id as string, { name, slug, description });

      return res.json(categoriaActualizada);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Datos de categoría inválidos",
          errors: error.issues.map(e => ({ path: e.path, message: e.message }))
        });
      }
      res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
  };