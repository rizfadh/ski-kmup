import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRoute = (pathname: string) => {
  if (pathname === "/") return pathname;
  return pathname.split("/").filter((str) => str !== "");
};
