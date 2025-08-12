import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("Connected to postgres using prisma client");

export default prisma;
