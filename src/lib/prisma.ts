import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Client Prisma (singleton).
 *
 * Prisma 7 requiert un « driver adapter » au runtime : on passe l'URL de la base
 * via @prisma/adapter-pg. En dev, on réutilise l'instance globale pour éviter
 * d'ouvrir une nouvelle connexion à chaque rechargement à chaud (HMR).
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
