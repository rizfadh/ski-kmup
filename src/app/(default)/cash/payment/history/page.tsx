import { getUserCashHistory } from "@/lib/cashDb";
import { auth } from "@/auth";
import { DataTable } from "@/components/DataTable";
import { paymentHistoryColumns } from "@/components/tables/cashColumns";

export default async function CashPaymentHistoryPage() {
  const session = await auth();
  if (!session || !session.user) return null;

  const cashHistory = await getUserCashHistory(session.user.id as string);

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <DataTable
        columns={paymentHistoryColumns}
        data={cashHistory}
        searchBy="month"
        searchPlaceholder="Bulan"
      />
    </div>
  );
}
