import { endOfMonth, startOfMonth } from "date-fns";
import db from "./db";
import getSession from "./getSession";
import { UserRole } from "@prisma/client";

export const getDivisionProgramPlans = async () => {
  const session = await getSession();

  if (!session || !session.user) throw new Error("Unauthorized");

  const getWaiting = db.workProgram.findMany({
    where: {
      userId: session.user.id,
      workProgramPlan: {
        OR: [
          { chairmanConfirm: null },
          { secretaryConfirm: null },
          { treasurerConfirm: null },
        ],
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
      workProgramPlan: {
        select: {
          chairmanConfirm: true,
          secretaryConfirm: true,
          treasurerConfirm: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const getAccepted = db.workProgram.findMany({
    where: {
      userId: session.user.id,
      workProgramPlan: {
        AND: [
          { chairmanConfirm: true },
          { secretaryConfirm: true },
          { treasurerConfirm: true },
        ],
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
      workProgramPlan: {
        select: {
          chairmanConfirm: true,
          secretaryConfirm: true,
          treasurerConfirm: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const getrejected = db.workProgram.findMany({
    where: {
      userId: session.user.id,
      workProgramPlan: {
        AND: [
          {
            AND: [
              { NOT: { chairmanConfirm: null } },
              { NOT: { secretaryConfirm: null } },
              { NOT: { treasurerConfirm: null } },
            ],
          },
          {
            OR: [
              { chairmanConfirm: false },
              { secretaryConfirm: false },
              { treasurerConfirm: false },
            ],
          },
        ],
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
      workProgramPlan: {
        select: {
          chairmanConfirm: true,
          secretaryConfirm: true,
          treasurerConfirm: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const [waiting, accepted, rejected] = await db.$transaction([
    getWaiting,
    getAccepted,
    getrejected,
  ]);

  return { waiting, accepted, rejected };
};

export const getDivisionPrograms = async () => {
  const session = await getSession();

  if (!session || !session.user) throw new Error("Unauthorized");

  return await db.workProgram.findMany({
    where: {
      userId: session.user.id,
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
    orderBy: { date: "asc" },
  });
};

export const getProgramPlans = async () => {
  const session = await getSession();

  if (!session || !session.user) throw new Error("Unauthorized");

  const roleConfirmFields: { [key: string]: string } = {
    CHAIRMAN: "chairmanConfirm",
    TREASURER: "treasurerConfirm",
    SECRETARY: "secretaryConfirm",
  };

  const confirmField = roleConfirmFields[session.user.role];

  const getWaiting = db.workProgram.findMany({
    where: {
      workProgramPlan: {
        [confirmField]: null,
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
      workProgramPlan: {
        select: {
          chairmanConfirm: true,
          secretaryConfirm: true,
          treasurerConfirm: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const getAccepted = db.workProgram.findMany({
    where: {
      workProgramPlan: {
        [confirmField]: true,
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
      workProgramPlan: {
        select: {
          chairmanConfirm: true,
          secretaryConfirm: true,
          treasurerConfirm: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const getrejected = db.workProgram.findMany({
    where: {
      workProgramPlan: {
        [confirmField]: false,
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
      workProgramPlan: {
        select: {
          chairmanConfirm: true,
          secretaryConfirm: true,
          treasurerConfirm: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const [waiting, accepted, rejected] = await db.$transaction([
    getWaiting,
    getAccepted,
    getrejected,
  ]);

  return { waiting, accepted, rejected };
};

export const getProgramsInformation = async () => {
  const now = new Date();
  const startOfMonthDate = startOfMonth(now);
  const endOfMonthDate = endOfMonth(now);

  const programsDb = await db.workProgram.findMany({
    where: {
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
    orderBy: {
      date: "asc",
    },
  });

  const programs = programsDb.map((program) => {
    return {
      id: program.id,
      name: program.name,
      date: program.date,
      implemented: program.workProgramReport?.implemented,
    };
  });

  const thisMonth = programs.filter((program) => {
    return program.date >= startOfMonthDate && program.date <= endOfMonthDate;
  });

  const closest = programs.filter((program) => {
    return program.date > now;
  });

  const implemented = programs.filter((program) => {
    return program.implemented;
  });

  const notImplemented = programs.filter((program) => {
    return program.implemented === false;
  });

  const notYetImplemented = programs.filter((program) => {
    return program.implemented === null;
  });

  return {
    closest: closest[0],
    secondClosest: closest[1],
    thisMonth: {
      count: thisMonth.length,
      programs: thisMonth,
    },
    information: {
      count: programs.length,
      implemented: {
        count: implemented.length,
        programs: implemented,
      },
      notImplemented: {
        count: notImplemented.length,
        programs: notImplemented,
      },
      notYetImplemented: {
        count: notYetImplemented.length,
        programs: notYetImplemented,
      },
    },
    programs: programsDb,
  };
};

export const getClosestProgram = async () => {
  const now = new Date();
  const closest = await db.workProgram.findMany({
    where: {
      workProgramPlan: {
        chairmanConfirm: true,
        treasurerConfirm: true,
        secretaryConfirm: true,
      },
      date: {
        gte: now,
      },
    },
    select: {
      name: true,
      date: true,
    },
    orderBy: {
      date: "asc",
    },
    take: 2,
  });
  return closest;
};
