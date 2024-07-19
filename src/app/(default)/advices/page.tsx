import { DataTable } from "@/components/DataTable";
import { advicesColumns } from "@/components/tables/advicesColumns";
import { getAdvices } from "@/lib/adviceDb";
import getSession from "@/lib/getSession";

export default async function AdvicePage() {
  const session = await getSession();
  if (!session || !session.user) return null;

  const advices = await getAdvices(session.user.role);

  return (
    <div className="container grid grid-cols-1 gap-y-4 py-4">
      <DataTable
        columns={advicesColumns}
        data={advices}
        searchBy="email"
        searchPlaceholder="Email"
      />
    </div>
  );
}
