"use server";

import { privateRoutes } from "@/constants/routes";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ProgramPlanSchema, DocumentSchema } from "@/schemas/ProgramSchema";
import { createId } from "@paralleldrive/cuid2";
import { storage } from "@/lib/firebase";
import { storageRef } from "@/constants/storageRef";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import getSession from "@/lib/getSession";
import { UserRole } from "@prisma/client";

export const addProgramPlan = async (
  data: z.infer<typeof ProgramPlanSchema>,
) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    const headOfDivision: UserRole[] = [
      "HEADOFDIVISION",
      "HEADOFKPSDM",
      "HEADOFMEDCEN",
    ];

    if (!headOfDivision.includes(session.user.role)) {
      return { error: true, message: "Unauthorized" };
    }

    const validated = ProgramPlanSchema.safeParse(data);

    if (!validated.success) return { error: true, message: "Invalid fields" };

    const { name, date, needs } = validated.data;

    const isDateTaken = await db.workProgram.findFirst({
      where: { date },
      select: { id: true },
    });

    if (isDateTaken) {
      return {
        error: true,
        message: "Tanggal tersebut sudah ada program kerja",
      };
    }

    const userPosition = await db.userPosition.findUnique({
      where: { userId: session.user.id as string },
      select: { division: true },
    });

    await db.workProgram.create({
      data: {
        userId: session.user.id as string,
        name,
        date,
        division: userPosition?.division as string,
        workProgramNeeds: {
          createMany: {
            data: needs,
          },
        },
        workProgramPlan: {
          create: {},
        },
        workProgramReport: {
          create: {},
        },
      },
    });

    revalidatePath(privateRoutes.programManagePlan);
    return {
      error: false,
      message: "Rencana program kerja berhasil dibuat, menunggu persetujuan",
    };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const deleteProgramPlan = async (id: string) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    const headOfDivision: UserRole[] = [
      "HEADOFDIVISION",
      "HEADOFKPSDM",
      "HEADOFMEDCEN",
    ];

    if (!headOfDivision.includes(session.user.role)) {
      return { error: true, message: "Unauthorized" };
    }

    const program = await db.workProgram.findUnique({
      where: { id },
      select: {
        workProgramPlan: {
          select: {
            chairmanConfirm: true,
            treasurerConfirm: true,
            secretaryConfirm: true,
          },
        },
      },
    });

    if (program === null || program.workProgramPlan === null) {
      return { error: true, message: "Program kerja tidak ditemukan" };
    }

    const { chairmanConfirm, treasurerConfirm, secretaryConfirm } =
      program.workProgramPlan;

    if (chairmanConfirm && treasurerConfirm && secretaryConfirm) {
      return { error: true, message: "Program kerja tidak dapat dihapus" };
    }

    await db.workProgram.delete({ where: { id } });

    revalidatePath(privateRoutes.programManagePlan);
    return { error: false, message: "Rencana program kerja berhasil dihapus" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const setProgramImplemented = async (id: string, formData: FormData) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    const headOfDivision: UserRole[] = [
      "HEADOFDIVISION",
      "HEADOFKPSDM",
      "HEADOFMEDCEN",
    ];

    if (!headOfDivision.includes(session.user.role)) {
      return { error: true, message: "Unauthorized" };
    }

    const data = {
      pdf: formData.get("pdf"),
    };

    const validated = DocumentSchema.safeParse(data);

    if (!validated.success) return { error: true, message: "Invalid fields" };

    const { pdf } = validated.data;

    const program = await db.workProgramReport.findUnique({
      where: { workProgramId: id },
      select: {
        implemented: true,
      },
    });

    if (program && program.implemented !== null) {
      return { error: true, message: "Program kerja sudah diatur" };
    }

    const proofRef = ref(storage, storageRef.programProof + id);

    await uploadBytes(proofRef, pdf);
    const pdfUrl = await getDownloadURL(proofRef);

    await db.workProgramReport.update({
      where: { workProgramId: id },
      data: {
        implemented: true,
        proofUrl: pdfUrl,
      },
    });

    revalidatePath(privateRoutes.programManage);
    return { error: false, message: "Status program kerja berhasil diubah" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const setProgramNotImplemented = async (id: string) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    const headOfDivision: UserRole[] = [
      "HEADOFDIVISION",
      "HEADOFKPSDM",
      "HEADOFMEDCEN",
    ];

    if (!headOfDivision.includes(session.user.role)) {
      return { error: true, message: "Unauthorized" };
    }

    const program = await db.workProgramReport.findUnique({
      where: { workProgramId: id },
      select: {
        implemented: true,
      },
    });

    if (program && program.implemented !== null) {
      return { error: true, message: "Program kerja sudah diatur" };
    }

    await db.workProgramReport.update({
      where: { workProgramId: id },
      data: {
        implemented: false,
      },
    });

    revalidatePath(privateRoutes.programManage);
    return { error: false, message: "Status program kerja berhasil diubah" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const confirmProgramPlan = async (
  programId: string,
  confirmation: boolean,
) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    const program = await db.workProgramPlan.findUnique({
      where: { workProgramId: programId },
    });

    if (!program) {
      return { error: true, message: "Program kerja tidak ditemukan" };
    }

    const { role } = session.user;

    if (role === "CHAIRMAN") {
      if (program.chairmanConfirm !== null) {
        return { error: true, message: "Program kerja sudah dikonfirmasi" };
      }

      await db.workProgramPlan.update({
        where: { workProgramId: programId },
        data: {
          chairmanConfirm: confirmation,
        },
      });

      revalidatePath(privateRoutes.programConfirm);
      return { error: false, message: "Konfirmasi program kerja berhasil" };
    }

    if (role === "TREASURER") {
      if (program.treasurerConfirm !== null) {
        return { error: true, message: "Program kerja sudah dikonfirmasi" };
      }

      await db.workProgramPlan.update({
        where: { workProgramId: programId },
        data: {
          treasurerConfirm: confirmation,
        },
      });

      revalidatePath(privateRoutes.programConfirm);
      return { error: false, message: "Konfirmasi program kerja berhasil" };
    }

    if (role === "SECRETARY") {
      if (program.secretaryConfirm !== null) {
        return { error: true, message: "Program kerja sudah dikonfirmasi" };
      }

      await db.workProgramPlan.update({
        where: { workProgramId: programId },
        data: {
          secretaryConfirm: confirmation,
        },
      });

      revalidatePath(privateRoutes.programConfirm);
      return { error: false, message: "Konfirmasi program kerja berhasil" };
    }

    return { error: true, message: "Unauthorized" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};
