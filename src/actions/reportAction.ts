"use server";

import { privateRoutes } from "@/constants/routes";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DocumentSchema } from "@/schemas/ProgramSchema";
import { storage } from "@/lib/firebase";
import { storageRef } from "@/constants/storageRef";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { UserRole } from "@prisma/client";

export const uploadReport = async (userId: string, formData: FormData) => {
  try {
    const data = {
      pdf: formData.get("pdf"),
    };

    const validated = DocumentSchema.safeParse(data);

    if (!validated.success) return { error: true, message: "Invalid fields" };

    const { pdf } = validated.data;

    const reportRef = ref(storage, storageRef.report + userId);

    await uploadBytes(reportRef, pdf);
    const reportUrl = await getDownloadURL(reportRef);

    const userPosition = await db.userPosition.findUnique({
      where: { userId },
      select: { title: true, division: true, role: true },
    });

    const permission: UserRole[] = [
      "ADMIN",
      "CHAIRMAN",
      "HEADOFDIVISION",
      "HEADOFKPSDM",
      "HEADOFMEDCEN",
    ];

    if (!permission.includes(userPosition?.role as UserRole)) {
      return { error: true, message: "Tidak memiliki izin" };
    }

    const type = userPosition?.division ?? "Global";
    const accepted = userPosition?.role === "CHAIRMAN" ? true : null;

    await db.accountablityReport.create({
      data: {
        userId,
        reportUrl: reportUrl,
        type: type as string,
        secretaryConfirm: accepted,
      },
    });

    revalidatePath(privateRoutes.reportManage);
    return {
      error: false,
      message: "LPJ berhasil diupload, menunggu persetujuan Sekum",
    };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const deleteReport = async (userId: string) => {
  try {
    await db.accountablityReport.delete({
      where: { userId },
    });

    const reportRef = ref(storage, storageRef.report + userId);

    await deleteObject(reportRef);

    revalidatePath(privateRoutes.reportManage);
    return {
      error: false,
      message: "LPJ berhasil dihapus",
    };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const confirmReport = async (
  userId: string,
  reportId: string,
  confirmation: boolean,
) => {
  const userPosition = await db.userPosition.findUnique({
    where: { userId },
    select: { role: true },
  });

  if (!userPosition || userPosition.role !== "SECRETARY") {
    return {
      error: true,
      message: "Tidak memiliki izin",
    };
  }

  try {
    await db.accountablityReport.update({
      where: { userId: reportId },
      data: {
        secretaryConfirm: confirmation,
      },
    });

    revalidatePath(privateRoutes.reportManage);
    return {
      error: false,
      message: `LPJ berhasil ${confirmation ? "disetujui" : "ditolak"}`,
    };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};
