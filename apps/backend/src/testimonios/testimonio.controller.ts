//testimonio.controller.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Controladoer para la gestion de testimonios

export class TestimoniosController {
//Crear un nuevo testimonio
  static async crear(req: Request, res: Response) {
    try {
      const { nombre, mensaje, estado } = req.body;

      const nuevo = await prisma.testimonio.create({
        data: {
          nombre,
          mensaje,
          estado: estado || "PENDIENTE"
        }
      });

      res.status(201).json(nuevo);
    } catch (error) {
      res.status(500).json({ error: "Error al crear testimonio" });
    }
  }

  //Obtener todos los tesrtimonios
  static async obtenerTodos(req: Request, res: Response) {
    try {
      const testimonios = await prisma.testimonio.findMany();
      res.json(testimonios);
    } catch (error) {
      console.log("FALLO EN DB:", error);
      res.status(500).json({ error: "Error al obtener testimonios" });
    }
  }
}