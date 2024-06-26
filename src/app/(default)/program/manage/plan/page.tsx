import LinkButton from "@/components/LinkButton";
import { privateRoutes } from "@/constants/routes";
import getSession from "@/lib/getSession";
import { CirclePlus } from "lucide-react";

export default async function ProgramManagePlanPage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <LinkButton variant="outline" href={privateRoutes.programManage}>
          <span className="flex items-center gap-2">
            Buat <CirclePlus className="h-[1.2rem] w-[1.2rem]" />
          </span>
        </LinkButton>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        UNDER CONSTRUCTION
      </div>
    </div>
  );
}
