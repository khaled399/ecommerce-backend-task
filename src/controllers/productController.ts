import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../utils/prisma";

// GET /products (all or filter by category)
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const products = await prisma.product.findMany({
      where: category ? { category: String(category) } : {},
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// PATCH /products/:id/increment
export const incrementQuantity = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const amountRaw = req.body?.amount;
  const amount = Math.max(
    1,
    Number.isFinite(Number(amountRaw)) ? Number(amountRaw) : 1
  );
  if (!Number.isFinite(id))
    return res.status(400).json({ error: "Invalid product id" });
  try {
    const updated = await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({ where: { id } });
      if (!product) throw Object.assign(new Error("Not Found"), { code: 404 });

      const newQty = (product as any).quantity + amount; // quantity exists post-migration
      const result = await tx.product.update({
        where: { id },
        data: {
          quantity: newQty as any,
          available: newQty > 0 ? true : product.available,
        },
      });
      return result;
    });
    return res.json(updated);
  } catch (err: any) {
    if (err?.code === 404)
      return res.status(404).json({ error: "Product not found" });
    return res.status(500).json({ error: "Failed to increment quantity" });
  }
};

// GET /products/:id
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    // Do not override 'available'. Respect manual availability flags.
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// POST /products
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { id, name, price, category, image, available, quantity } = req.body;
    
    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const newProduct = await prisma.product.create({
      data: { 
        id: Number(id),
        name: name || null,
        price: price ? new Prisma.Decimal(price) : null,
        category: category || null,
        image: image || null,
        available: available ?? false,
        quantity: quantity !== undefined ? Number(quantity) : 0,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// PATCH /products/:id/decrement
export const decrementQuantity = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id))
    return res.status(400).json({ error: "Invalid product id" });
  try {
    const updated = await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({ where: { id } });
      if (!product) throw Object.assign(new Error("Not Found"), { code: 404 });
      // Respect manual availability flag: if unavailable, do not allow decrement
      if (!product.available) {
        throw Object.assign(new Error("Unavailable"), { code: 409 });
      }
      
      const currentQuantity = product.quantity ?? 0;
      if (currentQuantity <= 0) {
        throw Object.assign(new Error("Out of Stock"), { code: 409 });
      }

      const newQty = currentQuantity - 1;
      const result = await tx.product.update({
        where: { id },
        data: {
          quantity: newQty,
          available: newQty > 0 ? product.available : false,
        },
      });
      return result;
    });
    return res.json(updated);
  } catch (err: any) {
    if (err?.code === 404)
      return res.status(404).json({ error: "Product not found" });
    if (err?.code === 409)
      return res.status(409).json({ error: "Out of Stock or Unavailable" });
    return res.status(500).json({ error: "Failed to decrement quantity" });
  }
};
