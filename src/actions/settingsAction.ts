"use server";

import { privateRoutes } from "@/constants/routes";
import db from "@/lib/db";
import getSession from "@/lib/getSession";
import { UserRole } from "@prisma/client";
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

    await db.userPosition.update({
      where: { userId: id },
      data: {
        title,
        division,
        role,
      },
    });

    revalidatePath(privateRoutes.settingsPosition);
    return { error: false, message: "Jabatan berhasil diubah" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const deleteUser = async (id: string, pathToRevalidate: string) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    if (session.user.role !== "HEADOFKPSDM") {
      return { error: true, message: "Unauthorized" };
    }

    await db.user.delete({
      where: { id },
    });

    revalidatePath(pathToRevalidate);
    return { error: false, message: "User ditolak" };
  } catch (e) {
    console.log(e);
    return { error: true, message: "Terjadi kesalahan" };
  }
};
