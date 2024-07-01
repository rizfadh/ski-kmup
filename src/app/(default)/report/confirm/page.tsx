import { ReportConfirmTable } from "@/components/ReportConfirmTable";
import getSession from "@/lib/getSession";
import { getConfirmationReport, getReport } from "@/lib/reportDb";

export default async function ProgramConfirmPage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  const reports = await getConfirmationReport();

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <ReportConfirmTable
        userId={session.user.id as string}
        reports={reports}
      />
    </div>
  );
}
