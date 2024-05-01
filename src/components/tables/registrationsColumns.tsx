"use client";

import { ColumnDef } from "@tanstack/react-table";
import ButtonDialog from "../ButtonDialog";
import { Check, X, ArrowUpDown } from "lucide-react";
import {
  acceptUserRegistration,
  rejectUserRegistration,
} from "@/actions/registrationsAction";
import { Button } from "../ui/button";
import { dateFormat } from "@/lib/dateFormatter";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  division: string[] | undefined;
  reason: string | undefined;
  isAccepted: boolean | undefined;
};

export const waitingColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "division",
    header: () => <div className="min-w-[100px]">Divisi</div>,
    cell: ({ row }) => {
      const division = row.getValue("division");
      if (Array.isArray(division)) {
        const formatted = division.map((value, index) => {
          const string = `${index + 1}. ${value}`;
          return <p key={index}>{string}</p>;
        });
        return formatted;
      }
    },
  },
  {
    accessorKey: "reason",
    header: () => <div className="min-w-[300px]">Alasan</div>,
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
    id: "accept",
    header: () => <div className="text-center">Terima</div>,
    cell: ({ row }) => {
      const { id, name } = row.original;

      return (
        <div className="flex justify-center">
          <ButtonDialog
            id={id}
            Icon={X}
            title="Tolak"
            description={`Tindakan ini akan menolak dan menghapus data pendaftaran ${name}`}
            action={rejectUserRegistration}
          />
          <ButtonDialog
            id={id}
            Icon={Check}
            title="Terima"
            description={`Tindakan ini akan menyetujui pendaftaran ${name} menjadi anggota SKI-KMUP`}
            action={acceptUserRegistration}
          />
        </div>
      );
    },
  },
];

export const acceptedColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "division",
    header: () => <div className="min-w-[100px]">Divisi</div>,
    cell: ({ row }) => {
      const division = row.getValue("division");
      if (Array.isArray(division)) {
        const formatted = division.map((value, index) => {
          const string = `${index + 1}. ${value}`;
          return <p key={index}>{string}</p>;
        });
        return formatted;
      }
    },
  },
  {
    accessorKey: "reason",
    header: () => <div className="min-w-[300px]">Alasan</div>,
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
];
