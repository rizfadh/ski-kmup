"use server";

import { privateRoutes } from "@/constants/routes";
import { storageRef } from "@/constants/storageRef";
import { isCashSet } from "@/lib/cashDb";
import db from "@/lib/db";
import { storage } from "@/lib/firebase";
import { dateFormatMonth } from "@/lib/formatter";
import getSession from "@/lib/getSession";
import { ChangeTermSchema } from "@/schemas/SettingsSchema";
import { UserRole } from "@prisma/client";
import { add, differenceInCalendarMonths } from "date-fns";
import { deleteObject, listAll, ref } from "firebase/storage";
import { revalidatePath } from "next/cache";

export const setUserPosition = async (
  id: string,
  title: string,
  division: string | null,
  role: UserRole,
) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    if (session.user.role !== "ADMIN") {
      return { error: true, message: "Unauthorized" };
    }

    if (session.user.id === id) {
      return { error: true, message: "Tidak bisa mengubah admin" };
    }

    if (role === "ADMIN") {
      return { error: true, message: "Tidak bisa mengubah menjadi admin" };
    }

    const cashInformation = await db.cashInformation.findFirst();
    const isUserCashSet = await db.cashPayment.findFirst({
      where: { userId: id },
      select: { userId: true },
    });

    const setUserPosition = db.userPosition.update({
      where: { userId: id },
      data: {
        title,
        division,
        role,
      },
    });

    if (cashInformation && !isUserCashSet) {
      const now = new Date();
      const months = differenceInCalendarMonths(cashInformation.endDate, now);

      if (months > 0) {
        const monthsArr = Array.from(Array(months + 1).keys());

        const setCashPayment = monthsArr.map((i) => {
          const date = add(now, { months: i });
          const month = dateFormatMonth(date);
          const due = add(date, { months: 1 });

          return db.cashPayment.create({
            data: {
              userId: id,
              cashInformationId: cashInformation.id,
              due,
              amount: cashInformation.amount,
              month,
            },
          });
        });

        await db.$transaction([setUserPosition, ...setCashPayment]);
      }
    }

    await setUserPosition;

    revalidatePath(privateRoutes.settingsPosition);
    return { error: false, message: "Jabatan berhasil diubah" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const changeTerm = async (word: string) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    if (session.user.role !== "ADMIN") {
      return { error: true, message: "Unauthorized" };
    }

    const data = {
      confirmation: word,
    };

    const validated = ChangeTermSchema.safeParse(data);

    if (!validated.success) return { error: true, message: "Invalid fields" };

    const userPositions = await db.user.findMany({
      where: {
        registerApproval: {
          isAccepted: true,
        },
        userPosition: {
          role: {
            notIn: ["ADMIN", "PASSIVE"],
          },
        },
      },
      select: {
        id: true,
      },
    });

    const setUserPositions = userPositions.map((position) => {
      return db.userPosition.update({
        where: { userId: position.id },
        data: {
          title: "Alumni",
          division: null,
          role: "PASSIVE",
        },
      });
    });

    const deleteCashPayment = db.cashInformation.deleteMany();
    const deleteCashInOut = db.cashInOut.deleteMany();
    const deleteProgram = db.workProgram.deleteMany();
    const deleteReport = db.accountablityReport.deleteMany();

    const prismaTransaction = db.$transaction([
      ...setUserPositions,
      deleteCashPayment,
      deleteCashInOut,
      deleteProgram,
      deleteReport,
    ]);

    const programRef = await listAll(ref(storage, storageRef.programProof));
    const reportRef = await listAll(ref(storage, storageRef.report));

    const deleteProgramStorage = programRef.items.map((item) =>
      deleteObject(item),
    );

    const deleteReportStorage = reportRef.items.map((item) =>
      deleteObject(item),
    );

    await Promise.all([
      prismaTransaction,
      deleteProgramStorage,
      deleteReportStorage,
    ]);

    revalidatePath(privateRoutes.settings);
    return { error: false, message: "Berhasil ganti periode" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};
