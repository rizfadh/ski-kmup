"use server";

import { privateRoutes } from "@/constants/routes";
import db from "@/lib/db";
import getSession from "@/lib/getSession";
import { revalidatePath } from "next/cache";

export const acceptUser = async (id: string) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { error: true, message: "Unauthorized" };
    }

    if (session.user.role !== "HEADOFKPSDM") {
      return { error: true, message: "Unauthorized" };
    }

    await db.user.update({
      where: { id },
      data: {
        registerApproval: {
          update: {
            isAccepted: true,
            acceptedAt: new Date(),
          },
        },
        userPosition: {
          create: {},
        },
      },
    });

    revalidatePath(privateRoutes.registrations);
    return { error: false, message: "User diterima" };
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
