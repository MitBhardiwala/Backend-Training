import { PrismaClient } from "@prisma/client";

const prisma =new PrismaClient();

console.log("Connected to postgres database using prisma client");


export default prisma;