"use client";

import { useTransition } from "react";
import { toast } from "./ui/use-toast";
import { cashMidtrans, setUserCashPaid } from "@/actions/cashAction";
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

type Props = {
  id: string;
};

export default function CashSetPaidButton({ id }: Props) {
  const [isPending, setTransition] = useTransition();

  const setPayHandler = () => {
    setTransition(async () => {
      const response = await setUserCashPaid(id);

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
        <Button variant="outline" disabled={isPending}>
          Sudah bayar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Pembayaran Kas</AlertDialogTitle>
          <AlertDialogDescription>
            Yakin ingin mengubah status menjadi lunas?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={setPayHandler}>Ya</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
