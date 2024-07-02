import LinkButton from "@/components/LinkButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { privateRoutes } from "@/constants/routes";
import { dateFormat } from "@/lib/formatter";
import getSession from "@/lib/getSession";
import { getReport } from "@/lib/reportDb";
import { UserRole } from "@prisma/client";
import { CircleCheck, FileText, Settings } from "lucide-react";

const manageRole: UserRole[] = [
  "HEADOFDIVISION",
  "HEADOFKPSDM",
  "HEADOFMEDCEN",
  "CHAIRMAN",
];

const confirmRole: UserRole[] = ["TREASURER", "SECRETARY"];

export default async function ReportPage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  const reports = await getReport();

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        {manageRole.includes(session.user.role) && (
          <LinkButton variant="outline" href={privateRoutes.reportManage}>
            <span className="flex items-center gap-2">
              Kelola <Settings className="h-[1.2rem] w-[1.2rem]" />
            </span>
          </LinkButton>
        )}
        {confirmRole.includes(session.user.role) && (
          <LinkButton variant="outline" href={privateRoutes.reportConfirm}>
            <span className="flex items-center gap-2">
              Konfirmasi <CircleCheck className="h-[1.2rem] w-[1.2rem]" />
            </span>
          </LinkButton>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Jenis</TableHead>
              <TableHead className="font-bold">Tanggal</TableHead>
              <TableHead className="text-center font-bold">LPJ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-24 text-center text-muted-foreground"
                >
                  Belum ada LPJ
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report) => (
                <TableRow key={report.userId}>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{dateFormat(report.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <LinkButton
                        variant="outline"
                        size="icon"
                        href={report.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-[1.2rem] w-[1.2rem]" />
                      </LinkButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
