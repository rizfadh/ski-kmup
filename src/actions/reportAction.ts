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
import getSession from "@/lib/getSession";

export const uploadReport = async (formData: FormData) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    const uploadRole: UserRole[] = [
      "HEADOFDIVISION",
      "HEADOFKPSDM",
      "HEADOFMEDCEN",
      "CHAIRMAN",
    ];

    if (!uploadRole.includes(session.user.role)) {
      return { error: true, message: "Unauthorized" };
    }

    const data = {
      pdf: formData.get("pdf"),
    };

    const validated = DocumentSchema.safeParse(data);

    if (!validated.success) return { error: true, message: "Invalid fields" };

    const { pdf } = validated.data;

    const reportRef = ref(
      storage,
      storageRef.report + (session.user.id as string),
    );

    await uploadBytes(reportRef, pdf);
    const reportUrl = await getDownloadURL(reportRef);

    const userPosition = await db.userPosition.findUnique({
      where: { userId: session.user.id as string },
      select: { division: true },
    });

    const type = userPosition?.division ?? "Global";
    const accepted = session.user.role === "CHAIRMAN" ? true : null;

    await db.accountablityReport.create({
      data: {
        userId: session.user.id as string,
        reportUrl,
        type,
        secretaryConfirm: accepted,
      },
    });

    revalidatePath(privateRoutes.reportManage);

    const message =
      session.user.role === "CHAIRMAN"
        ? "LPJ berhasil diupload"
        : "LPJ berhasil diupload, menunggu persetujuan Sekum";

    return { error: false, message };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const deleteReport = async () => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    const uploadRole: UserRole[] = [
      "HEADOFDIVISION",
      "HEADOFKPSDM",
      "HEADOFMEDCEN",
    ];

    if (!uploadRole.includes(session.user.role)) {
      return { error: true, message: "Unauthorized" };
    }

    await db.accountablityReport.delete({
      where: { userId: session.user.id as string },
    });

    const reportRef = ref(
      storage,
      storageRef.report + (session.user.id as string),
    );

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
  reportId: string,
  confirmation: boolean,
) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    const report = await db.accountablityReport.findUnique({
      where: { userId: reportId },
    });

    if (!report) {
      return {
        error: true,
        message: "LPJ tidak ditemukan",
      };
    }

    const { role } = session.user;

    if (role === "SECRETARY") {
      if (report.secretaryConfirm !== null) {
        return {
          error: true,
          message: "LPJ sudah dikonfirmasi",
        };
      }

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
    }

    if (role === "TREASURER") {
      if (report.treasurerConfirm !== null) {
        return {
          error: true,
          message: "LPJ sudah dikonfirmasi",
        };
      }

      await db.accountablityReport.update({
        where: { userId: reportId },
        data: {
          treasurerConfirm: confirmation,
        },
      });

      revalidatePath(privateRoutes.reportManage);
      return {
        error: false,
        message: `LPJ berhasil ${confirmation ? "disetujui" : "ditolak"}`,
      };
    }

    return { error: true, message: "Unauthorized" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};
