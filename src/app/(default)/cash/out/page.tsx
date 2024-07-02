import { CashInOutAddFormDialog } from "@/components/CashInOutFormDialog";
import { DataTable } from "@/components/DataTable";
import { cashInOutColumns } from "@/components/tables/cashColumns";
import { getCashInOut } from "@/lib/cashDb";
import getSession from "@/lib/getSession";

export default async function CashOutPage() {
  const session = await getSession();
  if (!session || !session.user) return null;

  const cashOut = await getCashInOut("OUT", session.user.role);

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <div className="flex gap-2">
        {session.user.role === "TREASURER" && (
          <CashInOutAddFormDialog cashType="OUT" />
        )}
      </div>
      <DataTable
        columns={cashInOutColumns}
        data={cashOut}
        searchBy="description"
        searchPlaceholder="Deskripsi"
      />
    </div>
  );
}
