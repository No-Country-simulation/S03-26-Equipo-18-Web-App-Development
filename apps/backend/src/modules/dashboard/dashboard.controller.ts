// src/modules/dashboard/dashboard.controller.ts

import { Request, Response, NextFunction } from "express";
import { getDashboardData } from "./dashboard.service";

export async function getDashboardController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await getDashboardData();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}