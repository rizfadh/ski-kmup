"use client";

import { useTransition } from "react";
import { toast } from "./ui/use-toast";
import { cashMidtrans } from "@/actions/cashAction";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";

declare global {
  interface Window {
    snap: any;
  }
}

type Props = {
  id: string;
  amount: number;
  month: string;
};

export default function CashPayButton({ id, amount, month }: Props) {
  const [isPending, setTransition] = useTransition();

  const midtransPaymentHandler = () => {
    setTransition(async () => {
      const response = await cashMidtrans({ id, amount, month });

      if (response.error) {
        toast({
          title: "Gagal",
          description: response.message,
          variant: "destructive",
        });

        return;
      }

      const token = response.token as string;
      window.snap.pay(token);
    });
  };

  return (
    <Button
      variant="outline"
      onClick={midtransPaymentHandler}
      disabled={isPending}
      className="flex items-center gap-2"
    >
      Bayar <Wallet className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
}
