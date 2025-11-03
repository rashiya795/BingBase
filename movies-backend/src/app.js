import express from "express";
import cors from "cors";
import mediaRoutes from './routes/mediaRoutes.js'
import authRoutes from './routes/authRotes.js'
import weekendRoutes from "./routes/weekendRoutes.js";

import "dotenv/config"

const app =express()

app.use(cors());
app.use(express.json())

app.use("/api/media",mediaRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/weekend", weekendRoutes);


app.listen(3000,() => console.log("server running on port 3000"))