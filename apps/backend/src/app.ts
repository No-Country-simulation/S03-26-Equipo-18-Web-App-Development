import express from "express";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

import helmet from "helmet";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes";
import { errorHandler } from "./middlewares/error-handler.middleware";
import testimoniosRouter from "./modules/testimonial/testimonial.router";
import publicTestimoniosRouter from "./modules/public/public-testimonials.router";
import categoriesRouter from "./modules/categories/categories.routes";
import usersRouter from "./modules/users/users.routes";

import tagRouter from "./modules/tag/tag.router";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";


const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(cors());
app.use(express.json());


app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Público
app.use(
  ['/public', '/api/v1'],
  cors({
    origin: '*',
  })
);

// Privado / dashboard
app.use(
  ['/auth', '/api/private'],
  cors({
    origin: allowedOrigins,
  })
);


app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/api/private/testimonials", testimoniosRouter);
app.use("/api/public/testimonials", publicTestimoniosRouter);
app.use('/api/private/categories', categoriesRouter);
app.use("/api/private/tags", tagRouter);
app.use("/api/private/dashboard", dashboardRoutes);

app.use(errorHandler);

// documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

export default app;