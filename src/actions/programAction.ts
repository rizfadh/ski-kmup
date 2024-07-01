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

export const addProgramPlan = async (
  userId: string,
  data: z.infer<typeof ProgramPlanSchema>,
) => {
  try {
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
      where: { userId },
      select: { division: true },
    });

    await db.workProgram.create({
      data: {
        userId,
        name,
        date,
        division: userPosition?.division ?? "Divisi",
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
    return { error: false, message: "Rencana program kerja berhasil dibuat" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const deleteProgramPlan = async (id: string) => {
  try {
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

    const cuid = createId();
    const proofRef = ref(storage, storageRef.programProof + cuid);

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
  userId: string,
  programId: string,
  confirmation: boolean,
) => {
  try {
    const program = await db.workProgramPlan.findUnique({
      where: { workProgramId: programId },
    });

    if (!program) {
      return { error: true, message: "Program kerja tidak ditemukan" };
    }

    const userRole = await db.user.findUnique({
      where: { id: userId },
      select: { userPosition: { select: { role: true } } },
    });

    if (!userRole || !userRole.userPosition) {
      return { error: true, message: "User tidak ditemukan" };
    }

    const { role } = userRole.userPosition;

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

    return { error: true, message: "Tidak memiliki izin" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};
