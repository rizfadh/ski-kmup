"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { ComponentProps, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { PlusCircle, X } from "lucide-react";
import { toast } from "./ui/use-toast";
import { ProgramPlanFormSchema } from "@/schemas/ProgramSchema";
import { ScrollArea } from "./ui/scroll-area";
import { addProgramPlan } from "@/actions/programAction";
import { dateFormatInput } from "@/lib/formatter";

interface ProgramAddFormDialogProps extends ComponentProps<typeof Button> {}

export function ProgramAddFormDialog({
  className,
  ...props
}: ProgramAddFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProgramPlanFormSchema>>({
    resolver: zodResolver(ProgramPlanFormSchema),
    defaultValues: {
      name: "",
      date: "",
      needs: [
        {
          name: "",
          amount: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "needs",
  });

  function onSubmit(data: z.infer<typeof ProgramPlanFormSchema>) {
    startTransition(async () => {
      const date = new Date(data.date);
      const needs = data.needs.map((need) => ({
        name: need.name,
        amount: need.amount as number,
      }));

      const response = await addProgramPlan({
        name: data.name,
        date,
        needs,
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
          Buat <PlusCircle className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[425px]">
        <ScrollArea className="max-h-[85vh]">
          <div className="p-6">
            <DialogHeader className="mb-3">
              <DialogTitle>Buat Rencana Program Kerja</DialogTitle>
              <DialogDescription>
                Masukan data program kerja yang ingin ditambahkan
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama program</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Ngopi #1" {...field} />
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
                        <Input
                          type="date"
                          min={dateFormatInput(new Date())}
                          className="inline-block"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="space-y-3 rounded-md border p-4"
                  >
                    <FormField
                      control={form.control}
                      name={`needs.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{`Keperluan ke-${index + 1}`}</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Aqua 3 dus"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`needs.${index}.amount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{`Biaya ke-${index + 1}`}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="60000"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {index > 0 && (
                      <Button
                        variant="outline"
                        disabled={isPending}
                        onClick={() => remove(index)}
                        className="w-full"
                      >
                        Hapus Keperluan
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  disabled={isPending}
                  onClick={() => append({ name: "", amount: "" })}
                  className="w-full"
                >
                  Tambah Keperluan
                </Button>
                <Button type="submit" className="w-full" disabled={isPending}>
                  Buat
                </Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
