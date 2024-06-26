import { CashInOutAddFormDialog } from "@/components/CashInOutFormDialog";
import { DataTable } from "@/components/DataTable";
import { cashInColumns } from "@/components/tables/cashColumns";
import { getCashInOut } from "@/lib/cashDb";
import getSession from "@/lib/getSession";

export default async function CashOutPage() {
  const [session, cashOut] = await Promise.all([
    getSession(),
    getCashInOut("OUT"),
  ]);
  if (!session || !session.user) return null;

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <div className="flex gap-2">
        <CashInOutAddFormDialog cashType="OUT" id={session.user.id as string} />
      </div>
      <DataTable
        columns={cashInColumns}
        data={cashOut}
        searchBy="description"
        searchPlaceholder="Deskripsi"
      />
    </div>
  );
}
