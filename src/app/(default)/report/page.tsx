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
import getSession from "@/lib/getSession";
import { CircleCheck, Settings } from "lucide-react";

export default async function ProgramPage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <LinkButton variant="outline" href={privateRoutes.reportManage}>
          <span className="flex items-center gap-2">
            Kelola <Settings className="h-[1.2rem] w-[1.2rem]" />
          </span>
        </LinkButton>
        <LinkButton variant="outline" href={privateRoutes.reportConfirm}>
          <span className="flex items-center gap-2">
            Konfirmasi <CircleCheck className="h-[1.2rem] w-[1.2rem]" />
          </span>
        </LinkButton>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Divisi</TableHead>
              <TableHead className="font-bold">Tanggal</TableHead>
              <TableHead className="font-bold">LPJ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Syiar</TableCell>
              <TableCell>12 Agt 2024</TableCell>
              <TableCell>LPJ</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>KPSDM</TableCell>
              <TableCell>12 Agt 2024</TableCell>
              <TableCell>LPJ</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Kemuslimahan</TableCell>
              <TableCell>12 Agt 2024</TableCell>
              <TableCell>LPJ</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Medcen</TableCell>
              <TableCell>12 Agt 2024</TableCell>
              <TableCell>LPJ</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sarpras</TableCell>
              <TableCell>12 Agt 2024</TableCell>
              <TableCell>LPJ</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Corporation</TableCell>
              <TableCell>12 Agt 2024</TableCell>
              <TableCell>LPJ</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
