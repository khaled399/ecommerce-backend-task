import { Router } from "express";
import { validationResult } from "express-validator";
import {
  getProducts,
  getProductById,
  createProduct,
  decrementQuantity,
  incrementQuantity,
} from "../controllers/productController";
import { createProductValidator } from "../validators/productValidator";

const router = Router();

router.get("/", getProducts); // GET /products
router.get("/:id", getProductById); // GET /products/:id
// simple validation result handler
const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post("/", createProductValidator, validate, createProduct); // POST /products
router.patch("/:id/decrement", decrementQuantity); // PATCH /products/:id/decrement
router.patch("/:id/increment", incrementQuantity); // PATCH /products/:id/increment

export default router;
