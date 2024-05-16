"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { dateFormat } from "@/lib/dateFormatter";
import ButtonDialog from "../ButtonDialog";
import { deleteAdvice } from "@/actions/advicesAction";
import { useTransition } from "react";
import { toast } from "../ui/use-toast";

export type Advice = {
  id: string;
  email: string;
  adviceFor: string;
  advice: string;
  createdAt: Date;
};

function AdvicesActionCell({ row }: { row: Row<Advice> }) {
  const { id, email } = row.original;

  const [isPending, setTransition] = useTransition();

  const deleteAdviceHandler = () => {
    setTransition(async () => {
      const response = await deleteAdvice(id);

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });
    });
  };

  return (
    <div className="flex justify-center">
      <ButtonDialog
        id={id}
        Icon={Trash}
        title="Hapus Saran"
        description={`Saran dari ${email} akan dihapus`}
        isDisabled={isPending}
        action={deleteAdviceHandler}
      />
    </div>
  );
}

export const advicesColumns: ColumnDef<Advice>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
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
    header: () => <div className="min-w-[300px]">Saran</div>,
  },
  {
    id: "actions",
    header: () => <div className="text-center">Tindakan</div>,
    cell: AdvicesActionCell,
  },
];
