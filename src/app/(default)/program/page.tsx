import LinkButton from "@/components/LinkButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { privateRoutes } from "@/constants/routes";
import { currencyFormat, dateFormat, dateFormatMonth } from "@/lib/formatter";
import getSession from "@/lib/getSession";
import { getProgramsInformation } from "@/lib/programDb";
import { CircleCheck, FileText, Settings } from "lucide-react";

export default async function ProgramPage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  const programsInformation = await getProgramsInformation();

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
            {programsInformation.closest ? (
              <>
                <p>{dateFormat(programsInformation.closest.date)}</p>
                <p className="text-4xl font-bold lg:text-5xl">
                  {programsInformation.closest.name}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">Tidak ada</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Terdekat Selanjutnya</CardTitle>
            <CardDescription>Terdekat setelahnya dari sekarang</CardDescription>
          </CardHeader>
          <CardContent>
            {programsInformation.secondClosest ? (
              <>
                <p>{dateFormat(programsInformation.secondClosest.date)}</p>
                <p className="text-4xl font-bold lg:text-5xl">
                  {programsInformation.secondClosest.name}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">Tidak ada</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2 lg:gap-4">
          <div className="lg:pr-6">
            <div className="space-y-1.5">
              <CardTitle>Proker Bulan {dateFormatMonth(new Date())}</CardTitle>
              <CardDescription>Proker pada bulan ini</CardDescription>
            </div>
            <div className="pt-6">
              <p className="text-4xl font-bold lg:text-5xl">
                {programsInformation.thisMonth.count} Proker
              </p>
              <div className="mt-6">
                {programsInformation.thisMonth.programs.map((program) => (
                  <div
                    className="flex flex-col justify-between sm:flex-row"
                    key={program.id}
                  >
                    <p>{program.name}</p>
                    <p className="font-bold">{dateFormat(program.date)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:pl-6">
            <div className="space-y-1.5">
              <CardTitle>Informasi</CardTitle>
              <CardDescription>Info proker periode ini</CardDescription>
            </div>
            <div className="pt-6">
              <div className="flex flex-wrap justify-between font-bold">
                <p>Jumlah Proker</p>
                <p>{programsInformation.information.count}</p>
              </div>
              <Separator className="my-2" />
              <div className="mb-2 flex flex-wrap justify-between font-bold">
                <p>Terlaksana</p>
                <p>{programsInformation.information.implemented.count}</p>
              </div>
              {programsInformation.information.implemented.programs.map(
                (program) => (
                  <div
                    className="flex flex-col justify-between sm:flex-row"
                    key={program.id}
                  >
                    <p>{program.name}</p>
                    <p className="font-bold">{dateFormat(program.date)}</p>
                  </div>
                ),
              )}
              <Separator className="my-2" />
              <div className="mb-2 flex flex-wrap justify-between font-bold">
                <p>Tidak Terlaksana</p>
                <p>{programsInformation.information.notImplemented.count}</p>
              </div>
              {programsInformation.information.notImplemented.programs.map(
                (program) => (
                  <div
                    className="flex flex-col justify-between sm:flex-row"
                    key={program.id}
                  >
                    <p>{program.name}</p>
                    <p className="font-bold">{dateFormat(program.date)}</p>
                  </div>
                ),
              )}
              <Separator className="my-2" />
              <div className="mb-2 flex flex-wrap justify-between font-bold">
                <p>Belum Terlaksana</p>
                <p>{programsInformation.information.notYetImplemented.count}</p>
              </div>
              {programsInformation.information.notYetImplemented.programs.map(
                (program) => (
                  <div
                    className="flex flex-col justify-between sm:flex-row"
                    key={program.id}
                  >
                    <p>{program.name}</p>
                    <p className="font-bold">{dateFormat(program.date)}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Nama</TableHead>
              <TableHead className="font-bold">Divisi</TableHead>
              <TableHead className="font-bold">Tanggal</TableHead>
              <TableHead className="font-bold">Keperluan</TableHead>
              <TableHead className="text-center font-bold">Bukti</TableHead>
              <TableHead className="text-center font-bold">
                Terlaksana
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programsInformation.programs.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  Belum ada program
                </TableCell>
              </TableRow>
            )}
            {programsInformation.programs.map((program) => (
              <TableRow key={program.id}>
                <TableCell>
                  <p className="min-w-[100px]">{program.name}</p>
                </TableCell>
                <TableCell>{program.division}</TableCell>
                <TableCell>
                  <p className="min-w-[100px]">{dateFormat(program.date)}</p>
                </TableCell>
                <TableCell>
                  {program.workProgramNeeds.map((need) => (
                    <p key={need.id} className="min-w-[300px]">
                      {need.name} - {currencyFormat(need.amount)}
                    </p>
                  ))}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    {program.workProgramReport?.proofUrl ? (
                      <LinkButton
                        variant="outline"
                        size="icon"
                        href={program.workProgramReport.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-[1.2rem] w-[1.2rem]" />
                      </LinkButton>
                    ) : (
                      <Button variant="outline" size="icon" disabled>
                        <FileText className="h-[1.2rem] w-[1.2rem] text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-center">
                    {program.workProgramReport?.implemented
                      ? "Ya"
                      : program.workProgramReport?.implemented === false
                        ? "Tidak"
                        : "Belum"}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
