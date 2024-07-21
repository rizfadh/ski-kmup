import ConfirmationIcon from "@/components/ConfirmationIcon";
import LinkButton from "@/components/LinkButton";
import { ReportUploadDialog } from "@/components/ReportManageAction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateFormat } from "@/lib/formatter";
import { getDivisionReports, isUploadEnabled } from "@/lib/reportDb";
import { FileText } from "lucide-react";

function ReportStatus({
  secretaryConfirm,
  treasurerConfirm,
}: {
  secretaryConfirm: boolean | null;
  treasurerConfirm: boolean | null;
}) {
  const statusClass = "w-[90px] py-1 rounded text-center";

  if (secretaryConfirm && treasurerConfirm)
    return (
      <div className={`${statusClass} bg-primary text-primary-foreground`}>
        Diterima
      </div>
    );

  if (
    secretaryConfirm !== null &&
    treasurerConfirm !== null &&
    (secretaryConfirm === false || treasurerConfirm === false)
  )
    return (
      <div
        className={`${statusClass} bg-destructive text-destructive-foreground`}
      >
        Ditolak
      </div>
    );

  return (
    <div className={`${statusClass} bg-secondary text-secondary-foreground`}>
      Menunggu
    </div>
  );
}

export default async function ReportManagePage() {
  const [reports, uploadEnabled] = await Promise.all([
    getDivisionReports(),
    isUploadEnabled(),
  ]);

  return (
    <div className="container grid grid-cols-1 gap-y-4 py-4">
      {uploadEnabled && <ReportUploadDialog />}
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
              <TableHead className="text-center font-bold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  Belum ada LPJ
                </TableCell>
              </TableRow>
            )}
            {reports.map((report) => (
              <TableRow key={report.id}>
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
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <ConfirmationIcon
                      isConfirmed={report.secretaryConfirm}
                      label="S"
                    />
                    <ConfirmationIcon
                      isConfirmed={report.treasurerConfirm}
                      label="B"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <ReportStatus
                      secretaryConfirm={report.secretaryConfirm}
                      treasurerConfirm={report.treasurerConfirm}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
