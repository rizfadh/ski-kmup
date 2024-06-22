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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useTransition } from "react";
import { CashSetFormSchema } from "@/schemas/CashSchema";
import { setCash } from "@/actions/cashAction";
import { toast } from "./ui/use-toast";

type Props = React.ComponentProps<typeof Card>;

export default function CashSetForm({ className, ...props }: Props) {
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

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Iuran Kas</CardTitle>
        <CardDescription>
          Kas yang harus dibayar untuk periode ini
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
