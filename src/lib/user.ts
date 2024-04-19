import { db } from "./db";

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({ where: { email } });
};

export const getUserById = async (id: string) => {
  return await db.user.findUnique({
    where: { id },
    include: {
      registerApproval: {
        select: {
          isAccepted: true,
        },
      },
    },
  });
};
