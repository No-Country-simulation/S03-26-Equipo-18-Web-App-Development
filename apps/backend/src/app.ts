//app.ts

import express from "express";
import testimonioRoutes from "./testimonios/testimonios.routes"

const app = express();

app.use(express.json());

app.use("/testimonios", testimonioRoutes)

app.get("/health", (req, res) => {
    res.json({ ok: true });
});

export default app;