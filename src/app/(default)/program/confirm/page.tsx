import ConfirmationIcon from "@/components/ConfirmationIcon";
import { ProgramPlanConfirmTable } from "@/components/ProgramPlanConfirmTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currencyFormat, dateFormat } from "@/lib/formatter";
import { getProgramPlans } from "@/lib/programDb";

export default async function ProgramConfirmPage() {
  const { waiting, accepted, rejected } = await getProgramPlans();

  return (
    <div className="container grid grid-cols-1 gap-y-4 py-4">
      <Tabs defaultValue="waiting">
        <TabsList>
          <TabsTrigger value="waiting">Menunggu</TabsTrigger>
          <TabsTrigger value="accepted">Diterima</TabsTrigger>
          <TabsTrigger value="rejected">Ditolak</TabsTrigger>
        </TabsList>
        <TabsContent value="waiting">
          <ProgramPlanConfirmTable programPlans={waiting} />
        </TabsContent>
        <TabsContent value="accepted">
          <div className="rounded-md border">
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
                {accepted.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Belum ada program
                    </TableCell>
                  </TableRow>
                )}
                {accepted.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>
                      <p className="min-w-[100px]">{plan.name}</p>
                    </TableCell>
                    <TableCell>{plan.division}</TableCell>
                    <TableCell>
                      <p className="min-w-[100px]">{dateFormat(plan.date)}</p>
                    </TableCell>
                    <TableCell>
                      {plan.workProgramNeeds.map((need) => (
                        <p key={need.id} className="min-w-[300px]">
                          {need.name} - {currencyFormat(need.amount)}
                        </p>
                      ))}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <ConfirmationIcon
                          isConfirmed={plan.workProgramPlan?.chairmanConfirm}
                          label="K"
                        />
                        <ConfirmationIcon
                          isConfirmed={plan.workProgramPlan?.secretaryConfirm}
                          label="S"
                        />
                        <ConfirmationIcon
                          isConfirmed={plan.workProgramPlan?.treasurerConfirm}
                          label="B"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="rejected">
          <div className="rounded-md border">
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
                {rejected.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Belum ada program
                    </TableCell>
                  </TableRow>
                )}
                {rejected.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>
                      <p className="min-w-[100px]">{plan.name}</p>
                    </TableCell>
                    <TableCell>{plan.division}</TableCell>
                    <TableCell>
                      <p className="min-w-[100px]">{dateFormat(plan.date)}</p>
                    </TableCell>
                    <TableCell>
                      {plan.workProgramNeeds.map((need) => (
                        <p key={need.id} className="min-w-[300px]">
                          {need.name} - {currencyFormat(need.amount)}
                        </p>
                      ))}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <ConfirmationIcon
                          isConfirmed={plan.workProgramPlan?.chairmanConfirm}
                          label="K"
                        />
                        <ConfirmationIcon
                          isConfirmed={plan.workProgramPlan?.secretaryConfirm}
                          label="S"
                        />
                        <ConfirmationIcon
                          isConfirmed={plan.workProgramPlan?.treasurerConfirm}
                          label="B"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
