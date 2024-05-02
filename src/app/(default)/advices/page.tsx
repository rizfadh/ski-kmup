import { DataTable } from "@/components/DataTable";
import { adviceColumns } from "@/components/tables/advicesColumns";
import { getAdvices } from "@/lib/adviceDb";

export default async function AdvicePage() {
  const advices = await getAdvices();

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <DataTable columns={adviceColumns} data={advices} />
    </div>
  );
}
