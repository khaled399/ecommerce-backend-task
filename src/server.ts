import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
