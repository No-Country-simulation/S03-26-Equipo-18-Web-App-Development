//testimonios.routes.ts

import { Router } from "express";
import { TestimoniosController } from "./testimonio.controller";

const router = Router();

//Rutas testimonio
router.post("/", TestimoniosController.crear);
router.get("/", TestimoniosController.obtenerTodos);

export default router;
