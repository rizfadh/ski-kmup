"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const acceptUserRegistration = async (id: string) => {
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

    revalidatePath("/registration");
  } catch (error) {
    console.log(error);
  }
};

export const rejectUserRegistration = async (id: string) => {
  try {
    await db.user.delete({
      where: { id },
    });

    revalidatePath("/registration");
  } catch (error) {}
};
