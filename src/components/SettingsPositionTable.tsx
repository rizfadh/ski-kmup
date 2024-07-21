"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeaderSort } from "./tables/ColumnHeaderSort";
import { useEffect, useState, useTransition } from "react";
import { dateFormat } from "@/lib/formatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { RoleSchema } from "@/schemas/SettingsSchema";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { userPosition } from "@/constants/userData";
import { setUserPosition } from "@/actions/settingsAction";
import { DataTable } from "./DataTable";
import { SquarePen } from "lucide-react";
import { UserRole } from "@prisma/client";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  title: string | null | undefined;
  division: string | null | undefined;
  role: UserRole | undefined;
};

type Props = {
  users: User[];
};

export default function SettingsPositionTable({ users }: Props) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RoleSchema>>({
    resolver: zodResolver(RoleSchema),
    defaultValues: {
      position: "",
    },
  });

  function onSubmit(data: z.infer<typeof RoleSchema>) {
    startTransition(async () => {
      const { title, division, role } = userPosition[+data.position];
      const response = await setUserPosition(
        user?.id as string,
        title,
        division,
        role,
      );

      setOpen(false);
      form.reset();

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });
    });
  }

  const changePositionHandler = (user: User) => {
    setUser(user);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) {
      setUser(null);
    }
  }, [open]);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <ColumnHeaderSort
          column={column}
          title="Nama"
          className="min-w-[200px]"
        />
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <ColumnHeaderSort column={column} title="Tgl daftar" />
      ),
      cell: ({ row }) => {
        const { createdAt } = row.original;
        return dateFormat(createdAt);
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <ColumnHeaderSort column={column} title="Jabatan" />
      ),
    },
    {
      accessorKey: "division",
      header: ({ column }) => (
        <ColumnHeaderSort column={column} title="Divisi" />
      ),
    },
    {
      id: "change",
      cell: ({ row }) => {
        const user = row.original;

        if (user.role === "ADMIN") return null;

        return (
          <Button
            variant="outline"
            onClick={() => changePositionHandler(user)}
            className="flex items-center gap-2"
          >
            Ubah <SquarePen className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ubah Jabatan Pengurus</DialogTitle>
            <DialogDescription>
              Silahkan pilih jabatan terbaru
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jabatan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Silahkan pilih" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[200px]">
                        {userPosition.map((position, index) => (
                          <SelectItem key={position.name} value={String(index)}>
                            {position.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                Atur
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <DataTable
        columns={columns}
        data={users}
        searchBy="name"
        searchPlaceholder="Nama"
      />
    </>
  );
}
