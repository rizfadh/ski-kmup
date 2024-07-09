"use client";

import { BadgeAlert, BadgeCheck, BadgeInfo } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { privateRoutes } from "@/constants/routes";
import LinkButton from "./LinkButton";

export default function CashStatus() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order_id");
  const transactionStatus = searchParams.get("transaction_status");

  const getStatus = (status: string | null) => {
    switch (status) {
      case "settlement":
        return {
          Icon: BadgeCheck,
          className: "text-primary",
          title: "Berhasil",
          body: "Pembayaran kas berhasil diterima",
        };
      case "deny":
      case "cancel":
      case "expired":
        return {
          Icon: BadgeAlert,
          className: "text-destructive",
          title: "Gagal",
          body: "Pembayaran kas belum berhasil",
        };
      default:
        return {
          Icon: BadgeInfo,
          className: "text-muted-foreground",
          title: "Pending",
          body: "Menunggu pembayaran kas",
        };
    }
  };

  const { Icon, className, title, body } = getStatus(transactionStatus);

  return (
    <div className="flex flex-col items-center">
      <Icon className={`h-40 w-40 ${className}`} />
      <h2 className={`mt-4 text-4xl font-black ${className}`}>{title}</h2>
      <p className="mt-4 text-sm text-muted-foreground">Order Id: {orderId}</p>
      <p>{body}</p>
      <div className="mt-4 flex gap-2">
        <LinkButton
          href={privateRoutes.cashPayment}
          className="w-[100px]"
          variant="outline"
        >
          Cek Kas
        </LinkButton>
        <LinkButton
          href={privateRoutes.dashboard}
          className="w-[100px]"
          variant="outline"
        >
          Dashboard
        </LinkButton>
      </div>
    </div>
  );
}
