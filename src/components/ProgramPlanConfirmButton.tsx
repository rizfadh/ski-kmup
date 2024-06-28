"use client";

import { useTransition } from "react";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
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
import { Check } from "lucide-react";
import { deleteProgramPlan } from "@/actions/programAction";

type Props = {
  id: string;
};

export function ProgramPlanConfirmButton({ id }: Props) {
  const [isPending, setTransition] = useTransition();

  const confirmHandler = () => {
    setTransition(async () => {
      const response = await deleteProgramPlan(id);

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
          <Check className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Rencana Program Kerja</AlertDialogTitle>
          <AlertDialogDescription>
            Yakin ingin menyetujui program kerja ini?
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
