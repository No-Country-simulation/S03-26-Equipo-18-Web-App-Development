//testimonios.routes.ts

import { Router } from "express";
import { TestimoniosController } from "../controllers/testimonio.controller";

const router = Router();

//Rutas testimonio
router.post("/", TestimoniosController.crear);
router.get("/", TestimoniosController.obtenerTodos);
router.patch("/:id", TestimoniosController.actualizar);

export default router;
