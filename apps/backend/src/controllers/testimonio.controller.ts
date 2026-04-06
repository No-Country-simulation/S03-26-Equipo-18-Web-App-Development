import { Request, Response } from "express";
import { ZodError } from "zod"; 
import { CreateTestimonialSchema } from "../schemas/testimonio.schema"; 
import { TestimoniosService } from "../services/testimonio.service";
import { z } from "zod";
import { TestimonialStatus } from "@prisma/client";

const QuerySchema = z.object({
  status: z.nativeEnum(TestimonialStatus).optional(),
});

export class TestimoniosController {
  
  static async crear(req: Request, res: Response) {
    try {
      const validatedData = CreateTestimonialSchema.parse(req.body);
      const nuevo = await TestimoniosService.crear(validatedData);
      return res.status(201).json(nuevo);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Error de validación",
          errors: error.issues.map(e => ({ path: e.path, message: e.message }))
        });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async obtenerTodos(req: Request, res: Response) {
    try {
      const result = QuerySchema.safeParse(req.query);
      const status = result.success ? result.data.status : undefined;
      
      const testimonios = await TestimoniosService.obtenerTodos(status);
      return res.json(testimonios);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener testimonios" });
    }
  }
static async actualizar(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    const datosParaActualizar = req.body; 

    const actualizado = await TestimoniosService.actualizar(id as string, datosParaActualizar);
    
    return res.json(actualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar el testimonio" });
  }
}
}