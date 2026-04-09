import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";;

// Tipado para el objeto global
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaBetterSqlite3({ url: connectionString });

// Usamos la instancia existente si existe, si no, creamos una nueva
export const prisma = globalForPrisma.prisma ||new PrismaClient({ adapter });

// En desarrollo, guardamos la instancia en el objeto global
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


