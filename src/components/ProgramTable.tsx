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
import { useEffect, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Check, FileText, X } from "lucide-react";
import { toast } from "./ui/use-toast";
import {
  ACCEPTED_DOC_MIME_TYPES,
  DocumentSchema,
} from "@/schemas/ProgramSchema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { currencyFormat, dateFormat } from "@/lib/formatter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  setProgramImplemented,
  setProgramNotImplemented,
} from "@/actions/programAction";
import LinkButton from "./LinkButton";

type Program = {
  id: string;
  date: Date;
  name: string;
  division: string;
  workProgramNeeds: {
    id: string;
    name: string;
    amount: number;
  }[];
  workProgramReport: {
    implemented: boolean | null;
    proofUrl: string | null;
  } | null;
};

type ProgramTableProps = {
  divisionPrograms: Program[];
};

type ConfirmationButtonProps = {
  implemented: boolean | null | undefined;
  confirmationHandler: (program: Program, implemented: boolean) => void;
  program: Program;
  isPending: boolean;
};

function ProgramImplemented({ implemented }: { implemented: boolean }) {
  const implementedClass = implemented
    ? "bg-primary text-primary-foreground"
    : "bg-destructive text-destructive-foreground";

  return (
    <div className={`w-[60px] rounded py-1 text-center ${implementedClass}`}>
      {implemented ? "Ya" : "Tidak"}
    </div>
  );
}

function ConfirmationButton({
  implemented,
  confirmationHandler,
  program,
  isPending,
}: ConfirmationButtonProps) {
  if (implemented)
    return (
      <div className="flex justify-center">
        <ProgramImplemented implemented={implemented} />
      </div>
    );

  if (implemented === false)
    return (
      <div className="flex justify-center">
        <ProgramImplemented implemented={implemented} />
      </div>
    );

  return (
    <div className="flex justify-center">
      <Button
        variant="ghost"
        size="icon"
        className="flex gap-2"
        onClick={() => confirmationHandler(program, false)}
        disabled={isPending}
      >
        <X className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="flex gap-2"
        onClick={() => confirmationHandler(program, true)}
        disabled={isPending}
      >
        <Check className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  );
}

export function ProgramTable({ divisionPrograms }: ProgramTableProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [program, setProgram] = useState<Program | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DocumentSchema>>({
    resolver: zodResolver(DocumentSchema),
  });

  function onSubmit(data: z.infer<typeof DocumentSchema>) {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("pdf", data.pdf);

      const response = await setProgramImplemented(
        program?.id as string,
        formData,
      );

      setFormOpen(false);
      form.reset();

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });
    });
  }

  const confirmationHandler = (program: Program, implemented: boolean) => {
    setProgram(program);

    if (implemented) setFormOpen(true);
    else setDialogOpen(true);
  };

  const NotImplementedHandler = () => {
    startTransition(async () => {
      const response = await setProgramNotImplemented(program?.id as string);

      setDialogOpen(false);

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });
    });
  };

  useEffect(() => {
    if (!formOpen && !dialogOpen) setProgram(null);
  }, [dialogOpen, formOpen]);

  return (
    <>
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Berjalannya Program</DialogTitle>
            <DialogDescription>
              Silahkan upload bukti berjalannya program {program?.name}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="pdf"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Bukti format PDF</FormLabel>
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
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Konfirmasi Program Tidak Berjalan
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini akan mengubah status {program?.name} menjadi tidak
              terlaksana
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={NotImplementedHandler}>
              Ya
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Nama</TableHead>
              <TableHead className="font-bold">Divisi</TableHead>
              <TableHead className="font-bold">Tanggal</TableHead>
              <TableHead className="font-bold">Keperluan</TableHead>
              <TableHead className="text-center font-bold">Bukti</TableHead>
              <TableHead className="text-center font-bold">
                Terlaksana
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {divisionPrograms.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  Belum ada program
                </TableCell>
              </TableRow>
            )}
            {divisionPrograms.map((program) => (
              <TableRow key={program.id}>
                <TableCell>
                  <p className="min-w-[100px]">{program.name}</p>
                </TableCell>
                <TableCell>{program.division}</TableCell>
                <TableCell>
                  <p className="min-w-[100px]">{dateFormat(program.date)}</p>
                </TableCell>
                <TableCell>
                  {program.workProgramNeeds.length === 0 && (
                    <p className="min-w-[300px] text-muted-foreground">
                      Tidak ada
                    </p>
                  )}
                  {program.workProgramNeeds.map((need) => (
                    <p key={need.id} className="min-w-[300px]">
                      {need.name} - {currencyFormat(need.amount)}
                    </p>
                  ))}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    {program.workProgramReport?.proofUrl ? (
                      <LinkButton
                        variant="outline"
                        size="icon"
                        href={program.workProgramReport.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-[1.2rem] w-[1.2rem]" />
                      </LinkButton>
                    ) : (
                      <Button variant="outline" size="icon" disabled>
                        <FileText className="h-[1.2rem] w-[1.2rem] text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <ConfirmationButton
                    implemented={program.workProgramReport?.implemented}
                    confirmationHandler={confirmationHandler}
                    program={program}
                    isPending={isPending}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
