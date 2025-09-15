import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "T-Shirt",
        price: 19.99,
        category: "Apparel",
        image:
          "https://i8.amplience.net/i/jpl/sz_725372_a?qlt=92&w=600&h=464&v=1&fmt=auto",
        available: true,
      },
      {
        name: "Laptop",
        price: 999.99,
        category: "Electronics",
        image:
          "https://www.zdnet.com/a/img/2023/03/30/e9341dbc-4178-4896-a55e-0c986c6411d5/macbook-pro-16-display.jpg",
        available: true,
      },
      {
        name: "Headphones",
        price: 199.99,
        category: "Electronics",
        image:
          "https://www.jbhifi.com.au/cdn/shop/files/659955-Product-0-I-638303244005823354_c31916bc-9da4-4572-94ff-abaddb0ea787.jpg?v=1728617009",
        available: false,
      },
    ],
  });

  console.log("✅ Database seeded!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
