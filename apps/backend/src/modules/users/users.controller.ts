// src/modules/users/users.controller.ts
import { Request, Response, NextFunction } from "express";
import {
  deleteUserParamsSchema,
  listUsersQuerySchema,
  updateUserBodySchema,
  updateUserParamsSchema,
} from "./users.schema";
import { deleteUserById, listUsers, updateUserById } from "./users.service";
import { AuthenticatedRequest } from "../auth/auth.controller";


export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const query = listUsersQuerySchema.parse(req.query);

    const users = await listUsers({
      role: query.role,
      isActive: query.isActive,
      search: query.search,
    });

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

export async function patchUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = updateUserParamsSchema.parse(req.params);
    const body = updateUserBodySchema.parse(req.body);

    const user = await updateUserById(id, body);

    return res.status(200).json({
      success: true,
      data: user,
      message: "Usuario actualizado correctamente",
    });
  } catch (error) {
    next(error);
  }
}

export async function removeUser(req: Request, res: Response, next: NextFunction) {
  try {
    const authReq = req as AuthenticatedRequest;
    const { id } = deleteUserParamsSchema.parse(req.params);

    const result = await deleteUserById(id, authReq.user?.sub);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
}