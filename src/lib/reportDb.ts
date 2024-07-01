import db from "./db";

export const getDivisionReport = async (id: string) => {
  return await db.accountablityReport.findUnique({
    where: { userId: id },
  });
};

export const getConfirmationReport = async () => {
  return await db.accountablityReport.findMany();
};

export const getReport = async () => {
  return await db.accountablityReport.findMany({
    where: {
      secretaryConfirm: true,
    },
  });
};
