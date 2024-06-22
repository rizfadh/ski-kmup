"use client";

import { BadgeAlert, BadgeCheck, BadgeInfo } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { privateRoutes } from "@/constants/routes";

export default function CashStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("order_id");
  const transactionStatus = searchParams.get("transaction_status");

  const getStatus = (status: string | null) => {
    switch (status) {
      case "settlement":
        return {
          Icon: BadgeCheck,
          title: "Berhasil",
          body: "Pembayaran kas berhasil diterima",
        };
      case "deny":
      case "cancel":
      case "expired":
        return {
          Icon: BadgeAlert,
          title: "Gagal",
          body: "Pembayaran kas belum berhasil",
        };
      default:
        return {
          Icon: BadgeInfo,
          title: "Pending",
          body: "Menunggu pembayaran kas",
        };
    }
  };

  const { Icon, title, body } = getStatus(transactionStatus);

  return (
    <div className="flex flex-col items-center">
      <Icon className="h-40 w-40 text-primary" />
      <h2 className="mt-4 text-4xl font-black">{title}</h2>
      <p className="mt-4 text-sm text-muted-foreground">Order Id: {orderId}</p>
      <p>{body}</p>
      <div className="mt-4 flex gap-2">
        <Button
          className="w-[100px]"
          onClick={() => router.push(privateRoutes.cashPayment)}
        >
          Cek Kas
        </Button>
        <Button
          className="w-[100px]"
          onClick={() => router.push(privateRoutes.dashboard)}
        >
          Dashboard
        </Button>
      </div>
    </div>
  );
}
