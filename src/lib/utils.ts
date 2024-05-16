import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stringReplaceSpace = (str: string) => {
  return str.replace(/\s/g, "_");
};
