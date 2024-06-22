import LinkButton from "@/components/LinkButton";
import { Check, History } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserCash } from "@/lib/cashDb";
import { auth } from "@/auth";
import { currencyFormat } from "@/lib/formatter";
import CashPayButton from "@/components/CashPayButton";
import MidtransScriptLoader from "@/components/MidtransScriptLoader";
import { privateRoutes } from "@/constants/routes";

export default async function CashPaymentPage() {
  const session = await auth();
  if (!session || !session.user) return null;

  const cashPayment = await getUserCash(session.user.id as string);

  return (
    <>
      <MidtransScriptLoader />
      <div className="container my-4 grid grid-cols-1 gap-y-4">
        <div className="flex gap-4">
          <LinkButton href={privateRoutes.cashPaymentHistory} variant="outline">
            <span className="flex items-center gap-2">
              Riwayat <History className="h-[1.2rem] w-[1.2rem]" />
            </span>
          </LinkButton>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Bulan</TableHead>
              <TableHead className="font-bold">Nominal</TableHead>
              <TableHead className="font-bold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cashPayment.map((cash) => (
              <TableRow key={cash.id}>
                <TableCell>{cash.month}</TableCell>
                <TableCell>{currencyFormat(cash.amount)}</TableCell>
                <TableCell>{cash.paid ? "Lunas" : "Belum dibayar"}</TableCell>
                <TableCell className="flex justify-center">
                  {cash.paid ? null : (
                    <CashPayButton
                      id={cash.id}
                      amount={cash.amount}
                      month={cash.month}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
