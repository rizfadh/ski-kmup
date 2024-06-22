import db from "./db";

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    select: {
      id: true,
      password: true,
    },
    where: { email },
  });
};

export const getUserByIdAuth = async (id: string) => {
  return await db.user.findUnique({
    where: { id },
    select: {
      userPosition: { select: { role: true } },
      registerApproval: { select: { isAccepted: true } },
    },
  });
};

export const getUserById = async (id: string) => {
  return await db.user.findUnique({
    where: { id },
    include: {
      userPosition: {
        select: { title: true },
      },
      _count: {
        select: {
          post: { where: { isAccepted: true } },
        },
      },
    },
  });
};

export const getUsersRegistrationStatus = async (isAccepted: boolean) => {
  const res = await db.user.findMany({
    where: { registerApproval: { isAccepted } },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      registerApproval: {
        select: {
          division: true,
          reason: true,
          isAccepted: true,
        },
      },
    },
  });

  const users = res.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      division: user.registerApproval?.division,
      reason: user.registerApproval?.reason,
      isAccepted: user.registerApproval?.isAccepted,
    };
  });

  return users;
};
