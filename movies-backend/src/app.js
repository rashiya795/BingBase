import express from "express";
import cors from "cors";
import mediaRoutes from './routes/mediaRoutes.js'
import authRoutes from './routes/authRotes.js'
import weekendRoutes from "./routes/weekendRoutes.js";

import "dotenv/config"

const app =express()

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];


app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));



app.use(express.json())

app.use("/api/media",mediaRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/weekend", weekendRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));