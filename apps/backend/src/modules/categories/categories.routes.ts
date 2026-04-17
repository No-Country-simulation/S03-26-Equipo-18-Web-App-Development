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

const categoriesRouter = Router();

categoriesRouter.use(authenticateJwt);

categoriesRouter.get('/', authorizeRoles(Role.ADMIN, Role.EDITOR), getCategories);
categoriesRouter.get('/:id', authorizeRoles(Role.ADMIN, Role.EDITOR), getCategoryById);
categoriesRouter.post('/', authorizeRoles(Role.ADMIN), createCategoryHandler);
categoriesRouter.patch('/:id', authorizeRoles(Role.ADMIN, Role.EDITOR), updateCategoryHandler);
categoriesRouter.delete('/:id', authorizeRoles(Role.ADMIN), deleteCategoryHandler);

export default categoriesRouter;