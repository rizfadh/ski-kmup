import ChangeTermFormDialog from "@/components/ChangeTermFormDialog";
import LinkButton from "@/components/LinkButton";
import { privateRoutes } from "@/constants/routes";
import getSession from "@/lib/getSession";
import { UserCog } from "lucide-react";

export default async function SettingsPage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  return (
    <div className="container grid h-screen grid-cols-1 place-items-center">
      <div className="flex flex-col gap-2">
        <LinkButton variant="outline" href={privateRoutes.settingsPosition}>
          <span className="flex items-center gap-2">
            Kelola Jabatan Pengurus{" "}
            <UserCog className="h-[1.2rem] w-[1.2rem]" />
          </span>
        </LinkButton>
        <ChangeTermFormDialog />
      </div>
    </div>
  );
}
