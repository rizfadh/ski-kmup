import LinkButton from "@/components/LinkButton";
import { ProgramTable } from "@/components/ProgramTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { privateRoutes } from "@/constants/routes";
import { currencyFormat, dateFormat } from "@/lib/formatter";
import getSession from "@/lib/getSession";
import { getDivisionPrograms } from "@/lib/programDb";
import { NotebookPen } from "lucide-react";

export default async function ProgramManagePage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  const divisionPrograms = await getDivisionPrograms(session.user.id as string);

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <LinkButton variant="outline" href={privateRoutes.programManagePlan}>
          <span className="flex items-center gap-2">
            Ajukan <NotebookPen className="h-[1.2rem] w-[1.2rem]" />
          </span>
        </LinkButton>
      </div>
      <ProgramTable divisionPrograms={divisionPrograms} />
    </div>
  );
}
