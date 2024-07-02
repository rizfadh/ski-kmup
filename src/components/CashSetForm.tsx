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
import { useState, useTransition } from "react";
import { CashSetFormSchema } from "@/schemas/CashSchema";
import { setCash } from "@/actions/cashAction";
import { toast } from "./ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Settings2 } from "lucide-react";

type Props = {
  disabled: boolean;
};

export default function CashSetForm({ disabled }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CashSetFormSchema>>({
    resolver: zodResolver(CashSetFormSchema),
    defaultValues: {
      amount: "",
      months: "",
    },
  });

  function onSubmit(data: z.infer<typeof CashSetFormSchema>) {
    startTransition(async () => {
      const { amount, months } = data;

      const response = await setCash({
        amount: amount as number,
        months: months as number,
      });

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });
    });
  }

  if (disabled) {
    return (
      <Button variant="outline" className="flex gap-2" disabled>
        Atur Iuran Kas <Settings2 className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          Atur Iuran Kas <Settings2 className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Iuran Kas</DialogTitle>
          <DialogDescription>
            Kas yang harus dibayar untuk periode ini
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nominal</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="5000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="months"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Bulan</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Tetapkan
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
