import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        id: 3,
        name: "Headphones",
        price: 199.99,
        category: "Electronics",
        image:
          "https://www.jbhifi.com.au/cdn/shop/files/659955-Product-0-I-638303244005823354_c31916bc-9da4-4572-94ff-abaddb0ea787.jpg?v=1728617009",
        available: false,
        quantity: 3,
      },
      {
        id: 11,
        name: "sneakers",
        price: 19.99,
        category: "Apparel",
        image:
          "https://f.nooncdn.com/p/pzsku/Z052C5603DEE73E6D0033Z/45/_/1737991637/0c754d16-2abe-4032-bde6-b7e519e91aef.jpg?width=1200",
        available: true,
        quantity: 12,
      },
      {
        id: 10,
        name: "Laptop",
        price: 999.99,
        category: "Electronics",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbHvcEI8nPY7Q_iJ5Frm_YhnRJ4bAufYNHRboI6vdYRUI8s0_ZNabqRDBmyRtoaDSslg&usqp=CAU",
        available: false,
        quantity: 6,
      },
      {
        id: 2,
        name: "Laptop",
        price: 999.99,
        category: "Electronics",
        image:
          "https://www.zdnet.com/a/img/2023/03/30/e9341dbc-4178-4896-a55e-0c986c6411d5/macbook-pro-16-display.jpg",
        available: true,
        quantity: 5,
      },
      {
        id: 1,
        name: "T-Shirt",
        price: 19.99,
        category: "Apparel",
        image:
          "https://i8.amplience.net/i/jpl/sz_725372_a?qlt=92&w=600&h=464&v=1&fmt=auto",
        available: true,
        quantity: 12,
      },
    ],
  });

  console.log("Seed data has been added successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
