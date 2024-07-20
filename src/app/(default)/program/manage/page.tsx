import LinkButton from "@/components/LinkButton";
import { ProgramTable } from "@/components/ProgramTable";
import { privateRoutes } from "@/constants/routes";
import { getDivisionPrograms } from "@/lib/programDb";
import { NotebookPen } from "lucide-react";

export default async function ProgramManagePage() {
  const divisionPrograms = await getDivisionPrograms();

  return (
    <div className="container grid grid-cols-1 gap-y-4 py-4">
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
