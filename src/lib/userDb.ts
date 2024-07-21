import db from "./db";
import getSession from "./getSession";

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
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
        select: { title: true, division: true },
      },
      _count: {
        select: {
          post: { where: { isAccepted: true } },
        },
      },
    },
  });
};

export const getUserPosition = async () => {
  const session = await getSession();

  if (!session || !session.user) throw new Error("Unauthorized");

  return await db.userPosition.findUnique({
    where: { userId: session.user.id },
  });
};

export const getAllUserPostion = async () => {
  const users = await db.user.findMany({
    where: { registerApproval: { isAccepted: true } },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      userPosition: { select: { title: true, division: true, role: true } },
    },
  });

  return users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      title: user.userPosition?.title,
      division: user.userPosition?.division,
      role: user.userPosition?.role,
    };
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
