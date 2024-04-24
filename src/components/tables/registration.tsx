"use client";

import { ColumnDef } from "@tanstack/react-table";
import ButtonDialog from "../ButtonDialog";
import { Check, X, ArrowUpDown } from "lucide-react";
import {
  acceptUserRegistration,
  rejectUserRegistration,
} from "@/actions/confirmation";
import { Button } from "../ui/button";
import { userDivision } from "@/constants/user";
import { dateFormat } from "@/lib/dateFormatter";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  division: string[] | undefined;
  reason: string | undefined;
  isAccepted: boolean | undefined;
};

export const columnsWaiting: ColumnDef<User>[] = [
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
    header: "Divisi",
    cell: ({ row }) => {
      const division = row.getValue("division");
      if (Array.isArray(division)) {
        const formatted = division
          .map((value, index) => {
            const string = `${index + 1}. ${userDivision[value as keyof typeof userDivision]}`;
            return string;
          })
          .join(" ");
        console.log(formatted);
        return formatted;
      }
    },
  },
  {
    accessorKey: "reason",
    header: "Alasan",
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
      const { id } = row.original;

      return (
        <div className="flex justify-center">
          <ButtonDialog
            id={id}
            Icon={X}
            title="Tolak"
            description="Tindakan ini akan menolak dan menghapus data pendaftaran user"
            action={rejectUserRegistration}
          />
          <ButtonDialog
            id={id}
            Icon={Check}
            title="Terima"
            description="Tindakan ini akan menyetujui pendaftaran user menjadi anggota SKI-KMUP"
            action={acceptUserRegistration}
          />
        </div>
      );
    },
  },
];

export const columnsAccepted: ColumnDef<User>[] = [
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
    header: "Divisi",
    cell: ({ row }) => {
      const division = row.getValue("division");
      if (Array.isArray(division)) {
        const formatted = division
          .map((value, index) => {
            const string = `${index + 1}. ${userDivision[value as keyof typeof userDivision]}`;
            return string;
          })
          .join(" ");
        console.log(formatted);
        return formatted;
      }
    },
  },
  {
    accessorKey: "reason",
    header: "Alasan",
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
