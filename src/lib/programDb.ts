import db from "./db";

export const getProgramPlans = async (id: string) => {
  return await db.workProgram.findMany({
    where: { userId: id },
    select: {
      id: true,
      name: true,
      division: true,
      date: true,
      workProgramNeeds: {
        select: {
          id: true,
          name: true,
          amount: true,
        },
      },
      workProgramPlan: {
        select: {
          chairmanConfirm: true,
          secretaryConfirm: true,
          treasurerConfirm: true,
        },
      },
    },
  });
};

export const getDivisionPrograms = async (id: string) => {
  return await db.workProgram.findMany({
    where: {
      userId: id,
      workProgramPlan: {
        chairmanConfirm: true,
        treasurerConfirm: true,
        secretaryConfirm: true,
      },
    },
    select: {
      id: true,
      name: true,
      division: true,
      date: true,
      workProgramNeeds: {
        select: {
          id: true,
          name: true,
          amount: true,
        },
      },
      workProgramReport: {
        select: {
          implemented: true,
          proofUrl: true,
        },
      },
    },
  });
};
