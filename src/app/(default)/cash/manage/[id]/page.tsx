import CashSetPaidButton from "@/components/CashSetPaidButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserCash } from "@/lib/cashDb";
import { currencyFormat } from "@/lib/formatter";
import { notFound } from "next/navigation";

export default async function CashManageUserPage({
  params,
}: {
  params: { id: string };
}) {
  const userCash = await getUserCash(params.id);

  if (!userCash) notFound();

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Bulan</TableHead>
              <TableHead className="font-bold">Nominal</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-center font-bold">Atur</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userCash.map((cash) => (
              <TableRow key={cash.id}>
                <TableCell>{cash.month}</TableCell>
                <TableCell>{currencyFormat(cash.amount)}</TableCell>
                <TableCell>{cash.paid ? "Lunas" : "Belum dibayar"}</TableCell>
                <TableCell className="flex justify-center">
                  {cash.paid ? null : <CashSetPaidButton id={cash.id} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
