"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { Check, X } from "lucide-react";
import { toast } from "./ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { currencyFormat, dateFormat } from "@/lib/formatter";
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
import { confirmProgramPlan } from "@/actions/programAction";
import PlanConfirmIcon from "./PlanConfirmIcon";
import { UserRole } from "@prisma/client";

type ProgramPlan = {
  id: string;
  date: Date;
  name: string;
  division: string;
  workProgramPlan: {
    chairmanConfirm: boolean | null;
    treasurerConfirm: boolean | null;
    secretaryConfirm: boolean | null;
  } | null;
  workProgramNeeds: {
    id: string;
    name: string;
    amount: number;
  }[];
};

type ProgramPlanConfirmTableProps = {
  userId: string;
  userRole: UserRole;
  programPlans: ProgramPlan[];
};

type ConfirmationButtonProps = {
  confirmed: boolean | null | undefined;
  dialogHandler: (program: ProgramPlan, confirmation: boolean) => void;
  program: ProgramPlan;
};

function ConfirmationButton({
  confirmed,
  dialogHandler,
  program,
}: ConfirmationButtonProps) {
  if (confirmed === null) {
    return (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="flex gap-2"
          onClick={() => dialogHandler(program, false)}
        >
          <X className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex gap-2"
          onClick={() => dialogHandler(program, true)}
        >
          <Check className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
    );
  }

  return null;
}

type UserConfirm = {
  chairmanConfirm: boolean | null;
  treasurerConfirm: boolean | null;
  secretaryConfirm: boolean | null;
} | null;

const userConfirm = (userRole: UserRole, confirmation: UserConfirm) => {
  if (userRole === "CHAIRMAN") return confirmation?.chairmanConfirm;
  if (userRole === "TREASURER") return confirmation?.treasurerConfirm;
  if (userRole === "SECRETARY") return confirmation?.secretaryConfirm;
};

export function ProgramPlanConfirmTable({
  userId,
  userRole,
  programPlans,
}: ProgramPlanConfirmTableProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [program, setProgram] = useState<ProgramPlan | null>(null);
  const [confirmation, setConfirmation] = useState<Boolean | null>(null);
  const [isPending, startTransition] = useTransition();

  const dialogHandler = (program: ProgramPlan, confirmation: boolean) => {
    setProgram(program);
    setConfirmation(confirmation);
    setDialogOpen(true);
  };

  const confirmHandler = () => {
    startTransition(async () => {
      const response = await confirmProgramPlan(
        userId,
        program?.id as string,
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
      setProgram(null);
      setConfirmation(null);
    }
  }, [dialogOpen]);

  return (
    <>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Konfirmasi Rencana Program Kerja
            </AlertDialogTitle>
            <AlertDialogDescription>
              Yakin ingin {confirmation ? "menyetujui" : "menolak"} program
              kerja {program?.name}?
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Nama</TableHead>
            <TableHead className="font-bold">Divisi</TableHead>
            <TableHead className="font-bold">Tanggal</TableHead>
            <TableHead className="font-bold">Keperluan</TableHead>
            <TableHead className="font-bold">Konfirmasi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programPlans.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-muted-foreground"
              >
                Belum ada program
              </TableCell>
            </TableRow>
          )}
          {programPlans.map((plan) => (
            <TableRow key={plan.id}>
              <TableCell>{plan.name}</TableCell>
              <TableCell>{plan.division}</TableCell>
              <TableCell>{dateFormat(plan.date)}</TableCell>
              <TableCell>
                {plan.workProgramNeeds.map((need) => (
                  <p key={need.id} className="min-w-[300px]">
                    {need.name} - {currencyFormat(need.amount)}
                  </p>
                ))}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <PlanConfirmIcon
                    isConfirmed={plan.workProgramPlan?.chairmanConfirm}
                  />
                  <PlanConfirmIcon
                    isConfirmed={plan.workProgramPlan?.secretaryConfirm}
                  />
                  <PlanConfirmIcon
                    isConfirmed={plan.workProgramPlan?.treasurerConfirm}
                  />
                </div>
              </TableCell>
              <TableCell>
                <ConfirmationButton
                  confirmed={userConfirm(userRole, plan.workProgramPlan)}
                  dialogHandler={dialogHandler}
                  program={plan}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
