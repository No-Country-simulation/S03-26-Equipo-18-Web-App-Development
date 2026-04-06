import { Router } from "express";
import { TagsController } from "../controllers/tag.controller";

const router = Router();

router.post("/", TagsController.crear);
router.get("/", TagsController.obtenerTodos);
router.patch("/:id", TagsController.actualizar);
router.delete("/:id", TagsController.borrar);

export default router;