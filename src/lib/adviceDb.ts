import { UserRole } from "@prisma/client";
import db from "./db";

export const getAdvices = async (userRole: UserRole) => {
  const advices = await db.advice.findMany();
  return advices.map((advice) => {
    return {
      id: advice.id,
      email: advice.email,
      adviceFor: advice.adviceFor,
      advice: advice.advice,
      createdAt: advice.createdAt,
      userRole,
    };
  });
};
