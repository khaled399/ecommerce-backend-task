import { body } from "express-validator";

export const createProductValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 200 })
    .withMessage("Name must be at most 200 characters"),

  body("price")
    .exists({ checkFalsy: true })
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isLength({ max: 100 })
    .withMessage("Category must be at most 100 characters"),

  body("image")
    .trim()
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL({ require_protocol: true })
    .withMessage("Image must be a valid URL (include http/https)"),

  body("available")
    .optional()
    .isBoolean()
    .withMessage("Available must be a boolean"),

  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be an integer >= 0"),
];
