import { getUsersRegistrationStatus } from "@/lib/userDb";
import { DataTable } from "@/components/DataTable";
import {
  acceptedColumns,
  waitingColumns,
} from "@/components/tables/registrationsColumns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function RegistrationPage() {
  const [waiting, accepted] = await Promise.all([
    getUsersRegistrationStatus(false),
    getUsersRegistrationStatus(true),
  ]);

  return (
    <div className="container grid grid-cols-1 gap-y-4 py-4">
      <Tabs defaultValue="waiting">
        <TabsList>
          <TabsTrigger value="waiting">Menunggu</TabsTrigger>
          <TabsTrigger value="accepted">Diterima</TabsTrigger>
        </TabsList>
        <TabsContent value="waiting">
          <DataTable
            columns={waitingColumns}
            data={waiting}
            searchBy="name"
            searchPlaceholder="Nama"
          />
        </TabsContent>
        <TabsContent value="accepted">
          <DataTable
            columns={acceptedColumns}
            data={accepted}
            searchBy="name"
            searchPlaceholder="Nama"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
