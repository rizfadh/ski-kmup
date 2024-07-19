import { CashInOutAddFormDialog } from "@/components/CashInOutFormDialog";
import { DataTable } from "@/components/DataTable";
import { cashInOutColumns } from "@/components/tables/cashColumns";
import { getCashInOut } from "@/lib/cashDb";
import getSession from "@/lib/getSession";

export default async function CashInPage() {
  const session = await getSession();
  if (!session || !session.user) return null;

  const cashIn = await getCashInOut("IN", session.user.role);

  return (
    <div className="container grid grid-cols-1 gap-y-4 py-4">
      <div className="flex gap-2">
        {session.user.role === "TREASURER" && (
          <CashInOutAddFormDialog cashType="IN" />
        )}
      </div>
      <DataTable
        columns={cashInOutColumns}
        data={cashIn}
        searchBy="description"
        searchPlaceholder="Deskripsi"
      />
    </div>
  );
}
