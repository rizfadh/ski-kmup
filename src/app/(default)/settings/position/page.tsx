import SettingsPositionTable from "@/components/SettingsPositionTable";
import getSession from "@/lib/getSession";
import { getAllUserPostion } from "@/lib/userDb";

export default async function SettingsPositionPage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  const usersPositon = await getAllUserPostion();

  return (
    <div className="container grid grid-cols-1 gap-y-4 py-4">
      <SettingsPositionTable users={usersPositon} />
    </div>
  );
}
