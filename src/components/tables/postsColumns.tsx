"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { dateFormat } from "@/lib/dateFormatter";
import ButtonDialog from "../ButtonDialog";
import { acceptPost } from "@/actions/postsAction";
import { privateRoutes } from "@/constants/routes";
import { deletePost } from "@/actions/postsAction";
import { useTransition } from "react";
import { toast } from "../ui/use-toast";
import { ColumnHeaderSort } from "./ColumnHeaderSort";

export type Posts = {
  id: string;
  createdBy: string;
  title: string;
  createdAt: Date;
};

function ConfirmActionCell({ row }: { row: Row<Posts> }) {
  const { id, createdBy } = row.original;

  const [isPending, setTransition] = useTransition();

  const rejectPostHandler = () => {
    setTransition(async () => {
      const response = await deletePost({
        id,
        pathToRevalidate: privateRoutes.postsManage,
      });

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });
    });
  };

  const acceptPostHandler = () => {
    setTransition(async () => {
      const response = await acceptPost(id);

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
        Icon={X}
        title="Tolak Postingan"
        description={`Postingan dari ${createdBy} akan dihapus`}
        isDisabled={isPending}
        action={rejectPostHandler}
      />
      <ButtonDialog
        id={id}
        Icon={Check}
        title="Terima Postingan"
        description={`Postingan dari ${createdBy} akan tampil di publik`}
        isDisabled={isPending}
        action={acceptPostHandler}
      />
    </div>
  );
}

export const confirmColumns: ColumnDef<Posts>[] = [
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <ColumnHeaderSort column={column} title="Dibuat oleh" />
    ),
  },
  {
    accessorKey: "title",
    header: () => <div className="min-w-[200px]">Judul</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <ColumnHeaderSort column={column} title="Tgl buat" />
    ),
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
    cell: ConfirmActionCell,
  },
];

function ManageActionCell({ row }: { row: Row<Posts> }) {
  const { id, createdBy } = row.original;

  const [isPending, setTransition] = useTransition();

  const deletePostHandler = () => {
    setTransition(async () => {
      const response = await deletePost({
        id,
        pathToRevalidate: privateRoutes.postsManage,
      });

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
        Icon={X}
        title="Hapus Postingan"
        description={`Postingan dari ${createdBy} akan dihapus`}
        isDisabled={isPending}
        action={deletePostHandler}
      />
    </div>
  );
}

export const manageColumns: ColumnDef<Posts>[] = [
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <ColumnHeaderSort column={column} title="Dibuat oleh" />
    ),
  },

  {
    accessorKey: "title",
    header: () => <div className="min-w-[200px]">Judul</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <ColumnHeaderSort column={column} title="Tgl buat" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      if (date instanceof Date) {
        return dateFormat(date);
      }
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Aksi</div>,
    cell: ManageActionCell,
  },
];
