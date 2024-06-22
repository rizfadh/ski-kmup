"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import {
  currencyFormat,
  dateFormat,
  dateFormatWithTime,
} from "@/lib/formatter";
import ButtonDialog from "../ButtonDialog";
import { deleteAdvice } from "@/actions/advicesAction";
import { useTransition } from "react";
import { toast } from "../ui/use-toast";
import { ColumnHeaderSort } from "./ColumnHeaderSort";

export type CashHistory = {
  id: string;
  paymentId: string;
  status: string;
  paymentType: string;
  amount: number;
  month: string;
  time: Date;
};

export const paymentHistoryColumns: ColumnDef<CashHistory>[] = [
  {
    accessorKey: "month",
    header: ({ column }) => <ColumnHeaderSort column={column} title="Bulan" />,
  },
  {
    accessorKey: "paymentType",
    header: ({ column }) => (
      <ColumnHeaderSort column={column} title="Pembayaran" />
    ),
  },
  {
    accessorKey: "amount",
    header: "Nominal",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;

      return currencyFormat(amount);
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <ColumnHeaderSort
        column={column}
        title="Status"
        className="justify-center"
      />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusStyle = () => {
        switch (status) {
          case "Sukses":
            return "bg-primary text-primary-foreground";
          case "Gagal":
            return "bg-destructive text-destructive-foreground";
          default:
            return "bg-secondary text-secondary-foreground";
        }
      };

      return (
        <div className="flex justify-center">
          <p
            className={`w-[80px] rounded-md px-2 py-1  text-center ${statusStyle()}`}
          >
            {status}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <ColumnHeaderSort
        column={column}
        title="Waktu"
        className="min-w-[150px] justify-center"
      />
    ),
    cell: ({ row }) => {
      const date = row.getValue("time");
      if (date instanceof Date) {
        return <div className="text-center">{dateFormatWithTime(date)}</div>;
      }
    },
  },
];
