/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Product";

-- CreateTable
CREATE TABLE "public"."product" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "price" MONEY,
    "category" TEXT,
    "image" TEXT,
    "available" BOOLEAN,
    "quantity" INTEGER,
    "createdat" TIMESTAMP(3),

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);
