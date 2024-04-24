import { getUserRegistrationStatus } from "@/lib/user";
import { DataTable } from "@/components/DataTable";
import {
  columnsAccepted,
  columnsWaiting,
} from "@/components/tables/registration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function RegistrationPage() {
  const [waiting, accepted] = await Promise.all([
    getUserRegistrationStatus(false),
    getUserRegistrationStatus(true),
  ]);

  return (
    <div className="container mt-4 grid grid-cols-1 gap-y-8">
      <Tabs defaultValue="waiting">
        <TabsList>
          <TabsTrigger value="waiting">Menunggu</TabsTrigger>
          <TabsTrigger value="accepted">Diterima</TabsTrigger>
        </TabsList>
        <TabsContent value="waiting">
          <DataTable columns={columnsWaiting} data={waiting} />
        </TabsContent>
        <TabsContent value="accepted">
          <DataTable columns={columnsAccepted} data={accepted} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
