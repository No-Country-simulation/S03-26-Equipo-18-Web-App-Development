import { NextFunction, Request, Response } from "express";
import {
    createCategorySchema,
    updateCategorySchema,
    categoryParamsSchema,   
} from "./categories.schema";
import { 
    createCategory, 
    deleteCategory, 
    findAllCategories, 
    findCategoryById, 
    updateCategory 
} from "./categories.service";

export async function getCategories(_req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await findAllCategories();

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getCategoryById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = categoryParamsSchema.parse(req.params);

    const category = await findCategoryById(id);

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    return next(error);
  }
}

export async function createCategoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = createCategorySchema.parse(req.body);

    const category = await createCategory(body);

    return res.status(201).json({
      success: true,
      message: 'Categoría creada correctamente',
      data: category,
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateCategoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = categoryParamsSchema.parse(req.params);
    const body = updateCategorySchema.parse(req.body);

    const category = await updateCategory(id, body);

    return res.status(200).json({
      success: true,
      message: 'Categoría actualizada correctamente',
      data: category,
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteCategoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = categoryParamsSchema.parse(req.params);

    const deletedCategory = await deleteCategory(id);

    return res.status(200).json({
      success: true,
      message: 'Categoría eliminada correctamente',
      data: deletedCategory,
    });
  } catch (error) {
    return next(error);
  }
}