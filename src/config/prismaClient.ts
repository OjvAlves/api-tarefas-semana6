import { PrismaClient } from '@prisma/client';

// Padrão Singleton: garantimos que existe UMA ÚNICA instância do PrismaClient
// em toda a aplicação. Cada instância do PrismaClient gerencia seu próprio
// pool de conexões com o banco — criar várias instâncias (ex: uma por request)
// esgotaria as conexões disponíveis do MySQL rapidamente.
const prisma = new PrismaClient();

export default prisma;
