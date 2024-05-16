"use server";

import { privateRoutes } from "@/constants/routes";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const acceptUser = async (id: string) => {
  try {
    await db.user.update({
      where: { id },
      data: {
        registerApproval: {
          update: {
            isAccepted: true,
            acceptedAt: new Date(),
          },
        },
      },
    });

    revalidatePath(privateRoutes.registrations);
    return { error: false, message: "User diterima" };
  } catch {
    return { error: true, message: "Terjadi kesalahan" };
  }
};

export const deleteUser = async (id: string, pathToRevalidate: string) => {
  try {
    await db.user.delete({
      where: { id },
    });

    revalidatePath(pathToRevalidate);
    return { error: false, message: "User ditolak" };
  } catch (error) {
    return { error: true, message: "Terjadi kesalahan" };
  }
};
