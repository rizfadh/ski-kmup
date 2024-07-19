import { ProgramPlanConfirmTable } from "@/components/ProgramPlanConfirmTable";
import getSession from "@/lib/getSession";
import { getProgramPlans } from "@/lib/programDb";

export default async function ProgramConfirmPage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  const programPlans = await getProgramPlans();

  return (
    <div className="container grid grid-cols-1 gap-y-4 py-4">
      <ProgramPlanConfirmTable
        userRole={session.user.role}
        programPlans={programPlans}
      />
    </div>
  );
}
