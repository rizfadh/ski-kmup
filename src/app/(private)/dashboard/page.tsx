import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";
import { getUserById } from "@/lib/user";

const greetings = (name: string) => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return `Selamat pagi ${name}`;
  } else if (currentHour < 15) {
    return `Selamat siang ${name}`;
  } else if (currentHour < 18) {
    return `Selamat sore ${name}`;
  } else {
    return `Selamat malam ${name}`;
  }
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) return null;

  const userData = await getUserById(session.user.id as string);

  return (
    <div className="container grid grid-cols-1 gap-8">
      <p className="text-5xl font-black">Dashboard</p>
      <LogoutButton />
      <div>
        <p>{greetings(session.user.name as string)}</p>
        <p>Ini data kamu yang ada di database</p>

        <pre className="mt-2 overflow-x-auto rounded-md bg-slate-950 p-4 ">
          <code className="text-white">
            {JSON.stringify(userData, null, 2)}
          </code>
        </pre>
      </div>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        Webnya masih blom jadi
      </p>
    </div>
  );
}
