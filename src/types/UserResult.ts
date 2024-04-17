import { User } from "@prisma/client";

export type UserResult = {
  error: boolean;
  data?: User;
};
