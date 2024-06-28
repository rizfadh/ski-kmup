import {
  differenceInMilliseconds,
  endOfMonth,
  isAfter,
  startOfMonth,
} from "date-fns";
import db from "./db";

export const getDivisionProgramPlans = async (id: string) => {
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

export const getProgramPlans = async () => {
  return await db.workProgram.findMany({
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

// export const getClosestProgram = async () => {
//   const now = new Date();

//   const closestQuery = db.workProgram.findFirst({
//     where: {
//       workProgramPlan: {
//         chairmanConfirm: true,
//         treasurerConfirm: true,
//         secretaryConfirm: true,
//       },
//       date: {
//         gte: now,
//       },
//     },
//     select: {
//       name: true,
//       date: true,
//     },
//     orderBy: {
//       date: "asc",
//     },
//   });

//   const secondClosestQuery = db.workProgram.findFirst({
//     where: {
//       workProgramPlan: {
//         chairmanConfirm: true,
//         treasurerConfirm: true,
//         secretaryConfirm: true,
//       },
//       date: {
//         gte: now,
//       },
//     },
//     select: {
//       name: true,
//       date: true,
//     },
//     orderBy: {
//       date: "asc",
//     },
//     skip: 1,
//   });

//   const startOfMonthDate = startOfMonth(now);
//   const endOfMonthDate = endOfMonth(now);

//   const thisMonthProgram = db.$transaction([
//     db.workProgram.findMany({
//       where: {
//         workProgramPlan: {
//           chairmanConfirm: true,
//           treasurerConfirm: true,
//           secretaryConfirm: true,
//         },
//         date: {
//           gte: startOfMonthDate,
//           lte: endOfMonthDate,
//         },
//       },
//       select: {
//         name: true,
//         date: true,
//       },
//       orderBy: {
//         date: "asc",
//       },
//     }),
//     db.workProgram.count({
//       where: {
//         workProgramPlan: {
//           chairmanConfirm: true,
//           treasurerConfirm: true,
//           secretaryConfirm: true,
//         },
//         date: {
//           gte: startOfMonthDate,
//           lte: endOfMonthDate,
//         },
//       },
//     }),
//   ]);

//   const implementedProgram = db.$transaction([
//     db.workProgram.findMany({
//       where: {
//         workProgramPlan: {
//           chairmanConfirm: true,
//           treasurerConfirm: true,
//           secretaryConfirm: true,
//         },
//         workProgramReport: {
//           implemented: true,
//         },
//       },
//       select: {
//         name: true,
//         date: true,
//       },
//       orderBy: {
//         date: "asc",
//       },
//     }),
//     db.workProgram.count({
//       where: {
//         workProgramPlan: {
//           chairmanConfirm: true,
//           treasurerConfirm: true,
//           secretaryConfirm: true,
//         },
//         date: {
//           gte: startOfMonthDate,
//           lte: endOfMonthDate,
//         },
//       },
//     }),
//   ]);
// };

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
      name: program.name,
      date: program.date,
      implemented: program.workProgramReport?.implemented,
    };
  });

  const thisMonth = programs.filter((program) => {
    return program.date >= startOfMonthDate && program.date <= endOfMonthDate;
  });

  const closest = thisMonth[0];
  const secondClosest = thisMonth[1];

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
    closest,
    secondClosest,
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

export const getPrograms = async () => {
  return await db.workProgram.findMany({
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
  });
};
