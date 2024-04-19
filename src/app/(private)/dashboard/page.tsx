import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";
import { getUserById } from "@/lib/user";

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) return null;

  const userData = await getUserById(session.user.id as string);

  return (
    <div className="container grid grid-cols-1 gap-8">
      <p className="text-5xl font-black">Dashboard</p>
      <LogoutButton />
      <div className="mb-8">
        <p>Halo selamat datang {session.user.name}</p>
        <p>Ini data kamu yang ada di database</p>

        <pre className="mt-2 overflow-x-auto rounded-md bg-slate-950 p-4 ">
          <code className="text-white">
            {JSON.stringify(userData, null, 2)}
          </code>
        </pre>
      </div>
    </div>
  );
}
