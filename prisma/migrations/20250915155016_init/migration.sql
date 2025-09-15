-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
