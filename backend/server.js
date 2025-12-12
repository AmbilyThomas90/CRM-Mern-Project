import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

dotenv.config();
connectDB();

const app = express();

/* ------------------------------
   CORS CONFIGURATION (IMPORTANT)
--------------------------------- */
app.use(
  cors({
    origin: [
    //   "http://localhost:5173",                // Local frontend (Vite)
      "https://crm-mern-project.vercel.app"   // Deployed frontend
    ],
    credentials: true
  })
);

app.use(express.json());

/* Test route */
app.get("/", (req, res) => res.send("API running"));

/* API routes */
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);

/* Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
