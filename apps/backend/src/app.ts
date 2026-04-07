import express from "express";
import testimoniosRouter from "./modules/testimonial/testimonial.router";
import publicTestimoniosRouter from "./modules/public/public-testimonials.router";

const app = express();

app.use(express.json());

app.use("/api/private/testimonials", testimoniosRouter);
app.use("/api/public/testimonials", publicTestimoniosRouter);

app.get("/health", (req, res) => {
    res.json({ ok: true });
});

export default app;