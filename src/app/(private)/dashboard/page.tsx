import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";
import PostItems from "@/components/PostItems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dateFormat } from "@/lib/dateFormatter";
import { generatePostDummy } from "@/lib/dummyData";
import { getUserById } from "@/lib/user";
import { Building2, CalendarPlus, Guitar, Mountain } from "lucide-react";
import { ComponentType } from "react";

type DashboradCardProps = {
  Icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};
function DashboardCard({ Icon, title, description }: DashboradCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="flex content-center gap-x-2">
          <Icon /> {title}
        </p>
        <p className="mt-3 text-xl font-bold">{description ?? "Tidak ada"}</p>
      </CardContent>
    </Card>
  );
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) return null;

  const userData = await getUserById(session.user.id as string);
  const postItems = generatePostDummy();

  return (
    <div className="container mt-4 grid grid-cols-1 gap-y-8">
      <div>
        <p>Selamat datang,</p>
        <p className="text-3xl font-black">{session.user.name}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <DashboardCard
            Icon={Building2}
            title="Jabatan"
            description={userData?.position ?? "Tidak ada"}
          />
          <DashboardCard
            Icon={CalendarPlus}
            title="Bergabung"
            description={dateFormat(userData?.createdAt as Date)}
          />
          <DashboardCard Icon={Guitar} title="Gitar" description="Main Gitar" />
          <DashboardCard
            Icon={Mountain}
            title="Gunung"
            description="Salak Bogor"
          />
        </div>
        <pre className="mt-4 overflow-x-auto rounded-md bg-slate-950 p-4 ">
          <code className="text-white">
            {JSON.stringify(userData, null, 2)}
          </code>
        </pre>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <PostItems props={postItems} />
      </div>
      <LogoutButton />
      <p className="mb-8 text-center text-sm text-muted-foreground">
        Webnya masih blom jadi
      </p>
    </div>
  );
}
