import prisma from "./db.ts";

export const checkExistingCompany = async (
  id?: number,
  name?: string,
  userId?: string
) => {
  const company = await prisma.company.findMany({
    where: { OR: [{ name: name }, { userId: userId }, { id: id }] },
  });

  if (company.length) {
    return true;
  }

  return false;
};

export const checkValidUserId = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user) {
    return true;
  }

  return false;
};
