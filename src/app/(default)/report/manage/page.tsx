import ConfirmationIcon from "@/components/ConfirmationIcon";
import LinkButton from "@/components/LinkButton";
import {
  ReportDeleteButton,
  ReportUploadDialog,
} from "@/components/ReportManageAction";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateFormat } from "@/lib/formatter";
import getSession from "@/lib/getSession";
import { getDivisionReport } from "@/lib/reportDb";
import { getUserPosition } from "@/lib/userDb";
import { FileText, X } from "lucide-react";

type Report = {
  report: {
    userId: string;
    type: string;
    reportUrl: string;
    secretaryConfirm: boolean | null;
    createdAt: Date;
  } | null;
};

function ReportAction({ report }: Report) {
  if (!report) {
    return <ReportUploadDialog />;
  }

  if (report.secretaryConfirm) return null;

  return <ReportDeleteButton />;
}

export default async function ReportManagePage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  const [userPosition, report] = await Promise.all([
    getUserPosition(session.user.id as string),
    getDivisionReport(session.user.id as string),
  ]);

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Jenis</TableHead>
              <TableHead className="font-bold">Tanggal</TableHead>
              <TableHead className="text-center font-bold">LPJ</TableHead>
              <TableHead className="text-center font-bold">
                Konfirmasi
              </TableHead>
              <TableHead className="text-center font-bold">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{userPosition?.division ?? "Global"}</TableCell>
              <TableCell>
                {report?.createdAt ? dateFormat(report.createdAt) : null}
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  {report?.reportUrl ? (
                    <LinkButton
                      variant="outline"
                      size="icon"
                      href={report.reportUrl}
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
                <div className="flex justify-center">
                  <ConfirmationIcon isConfirmed={report?.secretaryConfirm} />
                  <ConfirmationIcon isConfirmed={report?.treasurerConfirm} />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <ReportAction report={report} />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
