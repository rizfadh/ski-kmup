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

function CashPaid({ paid }: { paid: boolean }) {
  const paidClass = paid
    ? "bg-primary text-primary-foreground"
    : "bg-destructive text-destructive-foreground";

  return (
    <div className={`w-[100px] rounded py-1 text-center ${paidClass}`}>
      {paid ? "Lunas" : "Belum bayar"}
    </div>
  );
}

export default async function CashManageUserPage({
  params,
}: {
  params: { id: string };
}) {
  const userCash = await getUserCash(params.id);

  if (!userCash) notFound();

  return (
    <div className="container grid grid-cols-1 gap-y-4 py-4">
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
                <TableCell>
                  <CashPaid paid={cash.paid} />
                </TableCell>
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
