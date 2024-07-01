import LogoutButton from "@/components/LogoutButton";
import { PostItemsSide } from "@/components/PostItems";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { publicRoutes } from "@/constants/routes";
import { getCashPaidLate } from "@/lib/cashDb";
import { dateFormat } from "@/lib/formatter";
import getSession from "@/lib/getSession";
import { getPosts } from "@/lib/postDb";
import { getClosestProgram } from "@/lib/programDb";
import { getUserById } from "@/lib/userDb";
import {
  Building2,
  CalendarPlus,
  CircleArrowRight,
  Newspaper,
} from "lucide-react";
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
  const session = await getSession();

  if (!session || !session.user) return null;

  const [userData, posts, cashInfo, closestProgram] = await Promise.all([
    getUserById(session.user.id as string),
    getPosts(true, 4),
    getCashPaidLate(session.user.id as string),
    getClosestProgram(),
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
          description={
            userData?.userPosition?.division
              ? `${userData.userPosition.title} ${userData.userPosition.division}`
              : userData?.userPosition?.title
                ? userData.userPosition.title
                : "Tidak ada"
          }
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
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Iuran Kas Kamu</CardTitle>
            <CardDescription>Yang sudah dibayar</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <span className="text-4xl font-bold lg:text-5xl">
                {cashInfo.paid}
              </span>
              /{cashInfo.months} bulan
            </p>
            <p className="mt-6">
              Telat bayar:{" "}
              <span className="font-bold">{cashInfo.late} bulan</span>
            </p>
            <Progress
              className="mt-3"
              value={(cashInfo.paid / cashInfo.months) * 100}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Program Kerja</CardTitle>
            <CardDescription>Terdekat dari sekarang</CardDescription>
          </CardHeader>
          <CardContent>
            {closestProgram[0] ? (
              <>
                <p>{dateFormat(closestProgram[0].date)}</p>
                <p className="text-4xl font-bold lg:text-5xl">
                  {closestProgram[0].name}
                </p>
                <p className="mt-6 flex items-center">
                  <CircleArrowRight className="mr-2" />
                  Next
                  {closestProgram[1] ? (
                    <span className="ml-1 font-bold">
                      {closestProgram[1].name}
                    </span>
                  ) : (
                    <span className="ml-1 text-muted-foreground">
                      Tidak ada
                    </span>
                  )}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">Tidak ada</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <h2 className="text-2xl font-bold">Postingan Terbaru</h2>
        <Link href={publicRoutes.posts} className="text-primary">
          Lihat lainnya &rarr;
        </Link>
      </div>
      <PostItemsSide posts={posts} />
      <div className="flex justify-end">
        <LogoutButton />
      </div>
    </div>
  );
}
