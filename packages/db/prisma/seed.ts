import "dotenv/config";
import { prisma } from "../src/client";

async function main() {
  const courts = [
    { name: "Cancha 1", slug: "court-1" },
    { name: "Cancha 2", slug: "court-2" },
    { name: "Cancha 3", slug: "court-3" },
    { name: "Cancha 4", slug: "court-4" }
  ];

  for (const court of courts) {
    await prisma.court.upsert({
      where: { slug: court.slug },
      update: {},
      create: court
    });
  }

  console.log("✅ Canchas iniciales creadas");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
