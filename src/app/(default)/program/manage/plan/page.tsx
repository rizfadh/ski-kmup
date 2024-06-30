import PlanConfirmIcon from "@/components/PlanConfirmIcon";
import { ProgramAddFormDialog } from "@/components/ProgramAddFormDialog";
import ProgramPlanDeleteButton from "@/components/ProgramPlanDeleteButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currencyFormat, dateFormat } from "@/lib/formatter";
import getSession from "@/lib/getSession";
import { getDivisionProgramPlans } from "@/lib/programDb";

type PlanDeleteVisibleProps = {
  id: string;
  confirmation: {
    chairmanConfirm: boolean | null;
    treasurerConfirm: boolean | null;
    secretaryConfirm: boolean | null;
  } | null;
};

function PlanDeleteVisible({ id, confirmation }: PlanDeleteVisibleProps) {
  if (confirmation === null) return null;

  const { chairmanConfirm, treasurerConfirm, secretaryConfirm } = confirmation;

  if (chairmanConfirm && treasurerConfirm && secretaryConfirm) {
    return null;
  }

  return <ProgramPlanDeleteButton id={id} />;
}

export default async function ProgramManagePlanPage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  const programPlans = await getDivisionProgramPlans(session.user.id as string);

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <ProgramAddFormDialog id={session.user.id as string} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Nama</TableHead>
              <TableHead className="font-bold">Divisi</TableHead>
              <TableHead className="font-bold">Tanggal</TableHead>
              <TableHead className="font-bold">Keperluan</TableHead>
              <TableHead className="font-bold">Konfirmasi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programPlans.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  Belum ada program
                </TableCell>
              </TableRow>
            )}
            {programPlans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.name}</TableCell>
                <TableCell>{plan.division}</TableCell>
                <TableCell>{dateFormat(plan.date)}</TableCell>
                <TableCell>
                  {plan.workProgramNeeds.map((need) => (
                    <p key={need.id} className="min-w-[300px]">
                      {need.name} - {currencyFormat(need.amount)}
                    </p>
                  ))}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <PlanConfirmIcon
                      isConfirmed={plan.workProgramPlan?.chairmanConfirm}
                    />
                    <PlanConfirmIcon
                      isConfirmed={plan.workProgramPlan?.secretaryConfirm}
                    />
                    <PlanConfirmIcon
                      isConfirmed={plan.workProgramPlan?.treasurerConfirm}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <PlanDeleteVisible
                    id={plan.id}
                    confirmation={plan.workProgramPlan}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
