import { getUserCashHistory } from "@/lib/cashDb";
import { DataTable } from "@/components/DataTable";
import { paymentHistoryColumns } from "@/components/tables/cashColumns";
import getSession from "@/lib/getSession";

export default async function CashPaymentHistoryPage() {
  const session = await getSession();
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
