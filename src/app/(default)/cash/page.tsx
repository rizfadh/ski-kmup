import CashSetForm from "@/components/CashSetForm";
import LinkButton from "@/components/LinkButton";
import { privateRoutes } from "@/constants/routes";
import { isCashAmountExist } from "@/lib/cashDb";
import { ArrowLeftFromLine, ArrowRightToLine, CreditCard } from "lucide-react";

export default async function CashPage() {
  const cashExist = await isCashAmountExist();

  if (!cashExist) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <CashSetForm />
      </div>
    );
  }

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <LinkButton variant="outline" href={privateRoutes.cashPayment}>
          <span className="flex items-center gap-2">
            Bayar <CreditCard className="h-[1.2rem] w-[1.2rem]" />
          </span>
        </LinkButton>
        <LinkButton variant="outline" href="#">
          <span className="flex items-center gap-2">
            Kas Masuk <ArrowRightToLine className="h-[1.2rem] w-[1.2rem]" />
          </span>
        </LinkButton>
        <LinkButton variant="outline" href="#">
          <span className="flex items-center gap-2">
            Kas Keluar <ArrowLeftFromLine className="h-[1.2rem] w-[1.2rem]" />
          </span>
        </LinkButton>
      </div>
    </div>
  );
}
