import express from "express";

import helmet from "helmet";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes";
import { errorHandler } from "./middlewares/error-handler.middleware";
import testimoniosRouter from "./modules/testimonial/testimonial.router";
import publicTestimoniosRouter from "./modules/public/public-testimonials.router";
import categoriesRouter from "./modules/categories/categories.routes";


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
app.use("/api/private/testimonials", testimoniosRouter);
app.use("/api/public/testimonials", publicTestimoniosRouter);
app.use('/api/private/categories', categoriesRouter);

app.use(errorHandler);

export default app;