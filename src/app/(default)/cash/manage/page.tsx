import CashSetForm from "@/components/CashSetForm";
import { DataTable } from "@/components/DataTable";
import { cashManageColumns } from "@/components/tables/cashColumns";
import { getAllUserCash, isCashSet } from "@/lib/cashDb";

export default async function CashManagePage() {
  const [cashSet, allUserCash] = await Promise.all([
    isCashSet(),
    getAllUserCash(),
  ]);

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <div className="flex gap-2">
        <CashSetForm disabled={cashSet} />
      </div>
      <DataTable
        columns={cashManageColumns}
        data={allUserCash}
        searchBy="name"
        searchPlaceholder="Nama"
      />
    </div>
  );
}
