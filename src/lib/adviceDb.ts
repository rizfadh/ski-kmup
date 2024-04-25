import { db } from "./db";

export const getAdvices = async () => {
  return await db.advice.findMany();
};
