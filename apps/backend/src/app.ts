import express from "express";

import helmet from "helmet";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes";
import { errorHandler } from "./middlewares/error-handler.middleware";
import testimoniosRouter from "./modules/testimonial/testimonial.router";


const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/private/testimonials", testimoniosRouter);


app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Privado / dashboard
app.use(
  ['/auth', '/api/private'],
  cors({
    origin: allowedOrigins,
  })
);

// Público
app.use(
  ['/public', '/api/v1'],
  cors({
    origin: '*',
  })
);

app.use("/auth", authRouter);

app.use(errorHandler);

export default app;