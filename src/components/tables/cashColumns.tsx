"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { CreditCard, Trash } from "lucide-react";
import {
  currencyFormat,
  dateFormat,
  dateFormatWithTime,
} from "@/lib/formatter";
import { useTransition } from "react";
import { toast } from "../ui/use-toast";
import { ColumnHeaderSort } from "./ColumnHeaderSort";
import { deleteCashInOut } from "@/actions/cashAction";
import ButtonDialog from "@/components/ButtonDialog";
import { CashInOutUpdateFormDialog } from "../CashInOutFormDialog";
import { CashInOutType } from "@prisma/client";
import LinkButton from "../LinkButton";
import { privateRoutes } from "@/constants/routes";

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

export type CashInOut = {
  id: string;
  type: CashInOutType;
  description: string;
  amount: number;
  date: Date;
  createdBy: string;
};

function CashInOutCell({ row }: { row: Row<CashInOut> }) {
  const { id, type, description, amount, date } = row.original;

  const [isPending, setTransition] = useTransition();

  const deleteCashInHandler = () => {
    setTransition(async () => {
      const response = await deleteCashInOut(id, type);

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });
    });
  };

  return (
    <div className="flex justify-center">
      <CashInOutUpdateFormDialog
        id={id}
        cashType={type}
        description={description}
        amount={amount}
        date={date}
      />
      <ButtonDialog
        id={id}
        Icon={Trash}
        title="Hapus Kas Masuk"
        description={`${description} akan dihapus`}
        isDisabled={isPending}
        action={deleteCashInHandler}
      />
    </div>
  );
}

export const cashInColumns: ColumnDef<CashInOut>[] = [
  {
    accessorKey: "description",
    header: () => <div className="min-w-[200px]">Deskripsi</div>,
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
    accessorKey: "date",
    header: ({ column }) => (
      <ColumnHeaderSort
        column={column}
        title="Tanggal"
        className="min-w-[150px] justify-center"
      />
    ),
    cell: ({ row }) => {
      const date = row.getValue("date");
      if (date instanceof Date) {
        return <div className="text-center">{dateFormat(date)}</div>;
      }
    },
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <ColumnHeaderSort column={column} title="Dibuat oleh" />
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center">Aksi</div>,
    cell: CashInOutCell,
  },
];

export type CashManage = {
  id: string;
  name: string;
  paid: string[];
  unPaid: string[];
};

export const cashManageColumns: ColumnDef<CashManage>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <ColumnHeaderSort
        column={column}
        title="Nama"
        className="min-w-[150px]"
      />
    ),
  },
  {
    accessorKey: "paid",
    header: () => <div>Sudah bayar</div>,
    cell: ({ row }) => {
      const paid = row.getValue("paid") as string[];
      return <div className="w-[300px]">{paid.join(", ")}</div>;
    },
  },
  {
    accessorKey: "unPaid",
    header: () => <div>Belum bayar</div>,
    cell: ({ row }) => {
      const unPaid = row.getValue("unPaid") as string[];
      return <div className="w-[300px]">{unPaid.join(", ")}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="flex justify-center">
          <LinkButton
            href={privateRoutes.cashManageUser(id)}
            variant="outline"
            className="flex items-center gap-2"
          >
            Atur <CreditCard className="h-[1.2rem] w-[1.2rem]" />
          </LinkButton>
        </div>
      );
    },
  },
];
