import { auth } from "@/auth";

export default async function CashOutPage() {
  const session = await auth();
  if (!session || !session.user) return null;

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <p>OUT</p>
    </div>
  );
}
