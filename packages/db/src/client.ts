import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/client/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export function getPrisma() {
  if (!globalForPrisma.prisma) {
    const adapter = new PrismaNeon({
      connectionString: process.env.DATABASE_URL!
    });

    globalForPrisma.prisma = new PrismaClient({ adapter });
  }

  return globalForPrisma.prisma;
}

export const prisma = getPrisma();
