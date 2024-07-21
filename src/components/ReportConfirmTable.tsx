"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { Check, FileText, X } from "lucide-react";
import { toast } from "./ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { dateFormat } from "@/lib/formatter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import ConfirmationIcon from "./ConfirmationIcon";
import { confirmReport } from "@/actions/reportAction";
import LinkButton from "./LinkButton";
import { UserRole } from "@prisma/client";

type ConfirmationButtonProps = {
  confirmed: boolean | null | undefined;
  dialogHandler: (report: Report, confirmation: boolean) => void;
  report: Report;
};

function ConfirmationButton({
  confirmed,
  dialogHandler,
  report,
}: ConfirmationButtonProps) {
  if (confirmed || confirmed === false) {
    return (
      <div className="flex justify-center">
        <div
          className={`w-[80px] rounded py-1 text-center ${confirmed ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground"}`}
        >
          {confirmed ? "Diterima" : "Ditolak"}
        </div>
      </div>
    );
  }

  if (confirmed === null) {
    return (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="flex gap-2"
          onClick={() => dialogHandler(report, false)}
        >
          <X className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex gap-2"
          onClick={() => dialogHandler(report, true)}
        >
          <Check className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
    );
  }

  return null;
}

const userConfirm = (userRole: UserRole, report: Report) => {
  if (userRole === "TREASURER") return report.treasurerConfirm;
  if (userRole === "SECRETARY") return report.secretaryConfirm;
};

type Report = {
  id: string;
  userId: string;
  type: string;
  reportUrl: string;
  secretaryConfirm: boolean | null;
  treasurerConfirm: boolean | null;
  createdAt: Date;
};

type ReportConfirmTableProps = {
  userRole: UserRole;
  reports: Report[];
};

export function ReportConfirmTable({
  userRole,
  reports,
}: ReportConfirmTableProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [confirmation, setConfirmation] = useState<Boolean | null>(null);
  const [isPending, startTransition] = useTransition();

  const dialogHandler = (report: Report, confirmation: boolean) => {
    setReport(report);
    setConfirmation(confirmation);
    setDialogOpen(true);
  };

  const confirmHandler = () => {
    startTransition(async () => {
      const response = await confirmReport(
        report?.id as string,
        confirmation as boolean,
      );

      setDialogOpen(false);

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });
    });
  };

  useEffect(() => {
    if (!dialogOpen) {
      setReport(null);
      setConfirmation(null);
    }
  }, [dialogOpen]);

  return (
    <>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi LPJ</AlertDialogTitle>
            <AlertDialogDescription>
              Yakin ingin {confirmation ? "menyetujui" : "menolak"} LPJ{" "}
              {report?.type}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmHandler} disabled={isPending}>
              Ya
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
              <TableHead className="text-center font-bold">Terima</TableHead>
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
              <TableRow key={report.userId}>
                <TableCell>{report.type}</TableCell>
                <TableCell>{dateFormat(report.createdAt)}</TableCell>
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
                  <ConfirmationButton
                    confirmed={userConfirm(userRole, report)}
                    dialogHandler={dialogHandler}
                    report={report}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
