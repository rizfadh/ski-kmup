import LinkButton from "@/components/LinkButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { privateRoutes } from "@/constants/routes";
import getSession from "@/lib/getSession";
import { CircleCheck, Settings } from "lucide-react";

export default async function ProgramPage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <LinkButton variant="outline" href={privateRoutes.programManage}>
          <span className="flex items-center gap-2">
            Kelola <Settings className="h-[1.2rem] w-[1.2rem]" />
          </span>
        </LinkButton>
        <LinkButton variant="outline" href={privateRoutes.programConfirm}>
          <span className="flex items-center gap-2">
            Konfirmasi <CircleCheck className="h-[1.2rem] w-[1.2rem]" />
          </span>
        </LinkButton>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Program Kerja Terdekat</CardTitle>
            <CardDescription>Terdekat dari sekarang</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold lg:text-5xl"></p>
          </CardContent>
          <CardFooter>
            <div>
              <p className="text-sm text-muted-foreground">Bulan ini</p>
              <p className="font-bold"></p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
