"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, Trash, X } from "lucide-react";
import { Button } from "../ui/button";
import { dateFormat } from "@/lib/dateFormatter";
import ButtonDialog from "../ButtonDialog";
import { acceptPost } from "@/actions/postsAction";
import { privateRoutes } from "@/constants/routes";
import { deletePost } from "@/actions/postsAction";

export type Posts = {
  id: string;
  createdBy: string;
  title: string;
  createdAt: Date;
};

export const postsConfirmColumns: ColumnDef<Posts>[] = [
  {
    accessorKey: "createdBy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dibuat oleh
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: () => <div className="min-w-[200px]">Judul</div>,
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
    id: "actions",
    header: () => <div className="text-center">Terima</div>,
    cell: ({ row }) => {
      const { id, createdBy } = row.original;

      return (
        <div className="flex justify-center">
          <ButtonDialog
            id={id}
            Icon={X}
            title="Tolak Postingan"
            description={`Postingan dari ${createdBy} akan dihapus`}
            action={() => {
              const data = { id, pathToRevalidate: privateRoutes.postsConfirm };
              return deletePost(data);
            }}
          />
          <ButtonDialog
            id={id}
            Icon={Check}
            title="Terima Postingan"
            description={`Postingan dari ${createdBy} akan tampil di publik`}
            action={() => acceptPost(id)}
          />
        </div>
      );
    },
  },
];

export const postsManageColumns: ColumnDef<Posts>[] = [
  {
    accessorKey: "createdBy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dibuat oleh
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "title",
    header: () => <div className="min-w-[200px]">Judul</div>,
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
    id: "actions",
    header: () => <div className="text-center">Tindakan</div>,
    cell: ({ row }) => {
      const { id, createdBy } = row.original;

      return (
        <div className="flex justify-center">
          <ButtonDialog
            id={id}
            Icon={X}
            title="Hapus Postingan"
            description={`Postingan dari ${createdBy} akan dihapus`}
            action={async () => {
              const data = { id, pathToRevalidate: privateRoutes.postsConfirm };
              return await deletePost(data);
            }}
          />
        </div>
      );
    },
  },
];
