//app.ts

import express from "express";
import testimonioRoutes from "./routes/testimonios.routes"
import tagRoutes from "./routes/tag.routes";
import categoriesRoutes from"./routes/category.routes"

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes)
app.use("/testimonios", testimonioRoutes)
app.use("/tags", tagRoutes);

app.get("/health", (req, res) => {
    res.json({ ok: true });
});

export default app;