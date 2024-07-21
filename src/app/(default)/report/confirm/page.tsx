import { ReportConfirmTable } from "@/components/ReportConfirmTable";
import getSession from "@/lib/getSession";
import { getConfirmationReport } from "@/lib/reportDb";

export default async function ProgramConfirmPage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  const reports = await getConfirmationReport();

  return (
    <div className="container grid grid-cols-1 gap-y-4 py-4">
      <ReportConfirmTable userRole={session.user.role} reports={reports} />
    </div>
  );
}
