import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client/client.js";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error(
		"Falta DATABASE_URL. Definila en apps/web/.env.local porque Next corre desde apps/web."
	);
}

const globalForPrisma = globalThis as unknown as {
	prisma?: PrismaClient;
};

const adapter = new PrismaPg({
	connectionString: databaseUrl,
});

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		adapter,
	});

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}