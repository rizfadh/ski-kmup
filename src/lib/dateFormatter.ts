import { format } from "date-fns";
import { id } from "date-fns/locale";

export const dateFormatWithTime = (date: Date) => {
  return format(date, "PPp", {
    locale: id,
  });
};

export const dateFormat = (date: Date) => {
  return format(date, "PP", {
    locale: id,
  });
};
