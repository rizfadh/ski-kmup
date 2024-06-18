import { DataTable } from "@/components/DataTable";
import { advicesColumns } from "@/components/tables/advicesColumns";
import { getAdvices } from "@/lib/adviceDb";

export default async function AdvicePage() {
  const advices = await getAdvices();

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <DataTable
        columns={advicesColumns}
        data={advices}
        searchBy="email"
        searchPlaceholder="Email"
      />
    </div>
  );
}
