"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComponentProps, useEffect, useState, useTransition } from "react";
import { CashInOutFormSchema } from "@/schemas/CashSchema";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { FilePen, PlusCircle } from "lucide-react";
import { addCashInOut, updateCashInOut } from "@/actions/cashAction";
import { toast } from "./ui/use-toast";
import { dateFormatInput } from "@/lib/formatter";
import { CashInOutType } from "@prisma/client";

interface CashInOutAddFormDialogProps extends ComponentProps<typeof Button> {
  id: string;
  cashType: CashInOutType;
}

export function CashInOutAddFormDialog({
  id,
  cashType,
  className,
  ...props
}: CashInOutAddFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CashInOutFormSchema>>({
    resolver: zodResolver(CashInOutFormSchema),
    defaultValues: {
      description: "",
      amount: "",
      date: "",
    },
  });

  function onSubmit(data: z.infer<typeof CashInOutFormSchema>) {
    startTransition(async () => {
      const { description, amount, date } = data;

      const dateInput = new Date(date);

      const response = await addCashInOut(id, cashType, {
        description,
        amount: amount as number,
        date: dateInput,
      });

      setOpen(false);
      form.reset();

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn("flex gap-2", className)}
          {...props}
        >
          Tambah <PlusCircle className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Tambah Kas {cashType === "IN" ? "Masuk" : "Keluar"}
          </DialogTitle>
          <DialogDescription>
            Masukan data kas yang ingin ditambahkan
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Print LPJ 100 lembar"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nominal</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="100000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal</FormLabel>
                  <FormControl>
                    <Input type="date" className="inline-block" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Tambah
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface CashInOutUpdateFormDialogProps extends ComponentProps<typeof Button> {
  id: string;
  cashType: CashInOutType;
  description: string;
  amount: number;
  date: Date;
}

export function CashInOutUpdateFormDialog({
  id,
  cashType,
  description,
  amount,
  date,
  className,
  ...props
}: CashInOutUpdateFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CashInOutFormSchema>>({
    resolver: zodResolver(CashInOutFormSchema),
    defaultValues: {
      description: "",
      amount: "",
      date: "",
    },
  });

  useEffect(() => {
    form.reset({ description, amount, date: dateFormatInput(date) });
  }, [description, amount, date, form]);

  function onSubmit(data: z.infer<typeof CashInOutFormSchema>) {
    startTransition(async () => {
      const { description, amount, date } = data;

      const dateInput = new Date(date);

      const response = await updateCashInOut(id, cashType, {
        description,
        amount: amount as number,
        date: dateInput,
      });

      setOpen(false);

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("flex gap-2", className)}
          {...props}
        >
          <FilePen className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Update Kas {cashType === "IN" ? "Masuk" : "Keluar"}
          </DialogTitle>
          <DialogDescription>
            Masukan data kas yang ingin diupdate
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Print LPJ 100 lembar"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nominal</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="100000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal</FormLabel>
                  <FormControl>
                    <Input type="date" className="inline-block" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
