"use client";

import { useState, useTransition } from "react";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Contact } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChangeTermFormSchema } from "@/schemas/SettingsSchema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { changeTerm } from "@/actions/settingsAction";

export default function ChangeTermFormDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ChangeTermFormSchema>>({
    resolver: zodResolver(ChangeTermFormSchema),
    defaultValues: {
      confirmation: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ChangeTermFormSchema>) => {
    startTransition(async () => {
      const response = await changeTerm(data.confirmation);

      setOpen(false);
      form.reset();

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={isPending}
          className="flex items-center gap-2"
        >
          Ganti Periode Kepengurusan{" "}
          <Contact className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi Ganti Periode</DialogTitle>
          <DialogDescription>
            <p>
              Tindakan ini akan mengahapus semua data Kas, Program Kerja, dan
              LPJ.
            </p>
            <p>
              Ketik <strong>SKI-KMUP</strong> untuk melanjutkan
            </p>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Masukan kata</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Konfirmasi
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
