import { privateRoutes } from "@/constants/routes";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stringReplaceSpace = (str: string) => {
  return str.replace(/\s/g, "_");
};

export const isPrivateRoute = (pathname: string): boolean => {
  return Object.values(privateRoutes).some((route) => {
    if (typeof route === "string") {
      return pathname === route;
    } else if (typeof route === "function") {
      const dynamicRoutePrefix = route("").split("/:")[0];
      return pathname.startsWith(dynamicRoutePrefix);
    }
    return false;
  });
};

export const getDateNowIgnoreTime = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  return date;
};
