"use client";

import {
  ACCEPTED_DOC_MIME_TYPES,
  DocumentSchema,
} from "@/schemas/ProgramSchema";
import { Trash, Upload } from "lucide-react";
import { useState, useTransition } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { deleteReport, uploadReport } from "@/actions/reportAction";
import { toast } from "./ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export function ReportUploadDialog() {
  const [formOpen, setFormOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DocumentSchema>>({
    resolver: zodResolver(DocumentSchema),
  });

  function onSubmit(data: z.infer<typeof DocumentSchema>) {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("pdf", data.pdf);

      const response = await uploadReport(formData);

      setFormOpen(false);
      form.reset();

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });
    });
  }

  return (
    <Dialog open={formOpen} onOpenChange={setFormOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex w-fit items-center gap-2">
          Upload <Upload className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Laporan Pertanggungjawaban</DialogTitle>
          <DialogDescription>Silahkan upload LPJ</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="pdf"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>LPJ PDF</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept={ACCEPTED_DOC_MIME_TYPES}
                      onChange={(e) => {
                        if (!e.target.files) return;
                        onChange(e.target.files[0]);
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Upload
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function ReportDeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const confirmHandler = () => {
    startTransition(async () => {
      const response = await deleteReport(id);

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon" disabled={isPending}>
          <Trash className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus LPJ</AlertDialogTitle>
          <AlertDialogDescription>
            Yakin ingin menghapus LPJ ini?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={confirmHandler}>Ya</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
