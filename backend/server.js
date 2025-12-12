// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());

// app.use(cors({
//   origin: "https://your-frontend-project.vercel.app",
//   credentials: true
// }));

app.use(express.json());

// simple test route
app.get("/", (req, res) => res.send("API running"));

// mount auth and customer routes (we'll create these next)
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
