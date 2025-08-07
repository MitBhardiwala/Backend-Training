import { PrismaClient } from "../generated/prisma/index.js";


const prisma = new PrismaClient();
console.log("Connced to PostgreSQL using prisma")

export default prisma;