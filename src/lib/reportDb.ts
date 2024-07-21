import db from "./db";
import getSession from "./getSession";

export const isUploadEnabled = async () => {
  const session = await getSession();

  if (!session || !session.user) throw new Error("Unauthorized");

  const isEnabled = await db.accountablityReport.findMany({
    where: {
      userId: session.user.id,
      OR: [
        { secretaryConfirm: null },
        { treasurerConfirm: null },
        { AND: [{ secretaryConfirm: true }, { treasurerConfirm: true }] },
      ],
    },
  });

  return isEnabled.length === 0;
};

export const getDivisionReports = async () => {
  const session = await getSession();

  if (!session || !session.user) throw new Error("Unauthorized");

  return await db.accountablityReport.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
};

export const getConfirmationReport = async () => {
  return await db.accountablityReport.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getReport = async () => {
  return await db.accountablityReport.findMany({
    where: {
      secretaryConfirm: true,
      treasurerConfirm: true,
    },
    orderBy: { createdAt: "desc" },
  });
};
