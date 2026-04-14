import { Router } from 'express';
import { Role } from '@prisma/client';

// Ajusta este import al path real de tu middleware
import { authenticateJwt, authorizeRoles } from '../../middlewares/auth.middleware';

import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategories,
  getCategoryById,
  updateCategoryHandler,
} from './categories.controller';

const router = Router();

router.use(authenticateJwt);

router.get('/', authorizeRoles(Role.ADMIN, Role.EDITOR), getCategories);
router.get('/:id', authorizeRoles(Role.ADMIN, Role.EDITOR), getCategoryById);
router.post('/', authorizeRoles(Role.ADMIN), createCategoryHandler);
router.patch('/:id', authorizeRoles(Role.ADMIN, Role.EDITOR), updateCategoryHandler);
router.delete('/:id', authorizeRoles(Role.ADMIN), deleteCategoryHandler);

export default router;