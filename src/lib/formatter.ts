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

export const dateFormatMonth = (date: Date) => {
  return format(date, "MMMM", {
    locale: id,
  });
};

export const dateFormatInput = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

export const currencyFormat = (amount: number) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return formatter.format(amount);
};
