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
import { isUploadEnabled } from "@/lib/reportDb";

export const uploadReport = async (formData: FormData) => {
  try {
    const [session, isEnabled] = await Promise.all([
      getSession(),
      isUploadEnabled(),
    ]);

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

    if (!isEnabled) {
      return { error: true, message: "Sudah upload LPJ" };
    }

    const data = {
      pdf: formData.get("pdf"),
    };

    const validated = DocumentSchema.safeParse(data);

    if (!validated.success) return { error: true, message: "Invalid fields" };

    const { pdf } = validated.data;

    const reportRef = ref(storage, storageRef.report + session.user.id);

    await uploadBytes(reportRef, pdf);
    const reportUrl = await getDownloadURL(reportRef);

    const userPosition = await db.userPosition.findUnique({
      where: { userId: session.user.id },
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
        treasurerConfirm: accepted,
      },
    });

    revalidatePath(privateRoutes.reportManage);

    const message =
      session.user.role === "CHAIRMAN"
        ? "LPJ berhasil diupload"
        : "LPJ berhasil diupload, menunggu persetujuan";

    return { error: false, message };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const deleteReport = async (id: string) => {
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
      where: { id },
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
      where: { id: reportId },
      select: {
        secretaryConfirm: true,
        treasurerConfirm: true,
      },
    });

    if (!report) {
      return {
        error: true,
        message: "LPJ tidak ditemukan",
      };
    }

    const roleConfirmFields: { [key: string]: keyof typeof report } = {
      SECRETARY: "secretaryConfirm",
      TREASURER: "treasurerConfirm",
    };

    const confirmField = roleConfirmFields[session.user.role];

    if (report[confirmField] !== null) {
      return {
        error: true,
        message: "LPJ sudah dikonfirmasi",
      };
    }

    await db.accountablityReport.update({
      where: { id: reportId },
      data: {
        [confirmField]: confirmation,
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
