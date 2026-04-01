import express from "express";
import testimoniosRouter from "./modules/testimonial/testimonial.router";

const app = express();

app.use(express.json());

app.use("/api/private/testimonials", testimoniosRouter);

app.get("/health", (req, res) => {
    res.json({ ok: true });
});

export default app;