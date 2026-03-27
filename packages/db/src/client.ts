import { PrismaClient } from "../generated/client/client.js";

const globalForPrisma = globalThis as unknown as {
	prisma?: PrismaClient;
};

export function getPrisma() {
	if (!globalForPrisma.prisma) {
		globalForPrisma.prisma = new PrismaClient();
	}

	return globalForPrisma.prisma;
}

export const prisma = getPrisma();