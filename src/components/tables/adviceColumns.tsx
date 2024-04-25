"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { dateFormat } from "@/lib/dateFormatter";
import ButtonDialog from "../ButtonDialog";
import { deleteAdvice } from "@/actions/adviceAction";

export type Advice = {
  id: string;
  email: string;
  adviceFor: string;
  advice: string;
  createdAt: Date;
};

export const adviceColumns: ColumnDef<Advice>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      if (date instanceof Date) {
        return dateFormat(date);
      }
    },
  },
  {
    accessorKey: "adviceFor",
    header: "Untuk",
  },
  {
    accessorKey: "advice",
    header: "Saran",
  },
  {
    id: "actions",
    header: () => <div className="text-center">Tindakan</div>,
    cell: ({ row }) => {
      const { id, email } = row.original;

      return (
        <div className="flex justify-center">
          <ButtonDialog
            id={id}
            Icon={Trash}
            title="Hapus Saran"
            description={`Saran dari ${email} akan dihapus`}
            action={deleteAdvice}
          />
        </div>
      );
    },
  },
];
