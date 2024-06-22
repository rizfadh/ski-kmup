"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { dateFormat } from "@/lib/formatter";
import ButtonDialog from "../ButtonDialog";
import { deleteAdvice } from "@/actions/advicesAction";
import { useTransition } from "react";
import { toast } from "../ui/use-toast";
import { ColumnHeaderSort } from "./ColumnHeaderSort";

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
    header: ({ column }) => <ColumnHeaderSort column={column} title="Email" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <ColumnHeaderSort column={column} title="Tgl kirim" />
    ),
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
    header: () => <div className="text-center">Aksi</div>,
    cell: AdvicesActionCell,
  },
];
