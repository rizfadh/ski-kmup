import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";
import { PostItemsSide } from "@/components/PostItems";
import { Card, CardContent } from "@/components/ui/card";
import { publicRoutes } from "@/constants/routes";
import { dateFormat } from "@/lib/dateFormatter";
import { getPosts } from "@/lib/postDb";
import { getUserById } from "@/lib/userDb";
import { Building2, CalendarPlus, Mountain, Newspaper } from "lucide-react";
import Link from "next/link";
import { ComponentType } from "react";

type DashboradCardProps = {
  Icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};
function DashboardCard({ Icon, title, description }: DashboradCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
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

  const [userData, posts] = await Promise.all([
    getUserById(session.user.id as string),
    getPosts(true, 4),
  ]);

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <div>
        <p>Selamat datang,</p>
        <p className="text-3xl font-black">{session.user.name}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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
        <DashboardCard
          Icon={Newspaper}
          title="Postingan"
          description={userData?._count.post.toString() ?? "0"}
        />
        <DashboardCard
          Icon={Mountain}
          title="Gunung"
          description="Salak Bogor"
        />
      </div>
      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(userData, null, 2)}</code>
      </pre>
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <h2 className="text-2xl font-bold">Postingan Terbaru</h2>
        <Link href={publicRoutes.posts} className="text-primary">
          Lihat lainnya &rarr;
        </Link>
      </div>
      <PostItemsSide posts={posts} />
      <LogoutButton />
      <p className="text-sm text-muted-foreground">Webnya masih blom jadi</p>
    </div>
  );
}
