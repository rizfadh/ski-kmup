import LinkButton from "@/components/LinkButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { privateRoutes } from "@/constants/routes";
import { getCashInfo, isCashSet } from "@/lib/cashDb";
import { currencyFormat } from "@/lib/formatter";
import getSession from "@/lib/getSession";
import {
  ArrowLeftFromLine,
  ArrowRightToLine,
  CreditCard,
  Settings,
} from "lucide-react";
import Link from "next/link";

export default async function CashPage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  const [cashSet, cashInfo] = await Promise.all([
    isCashSet(),
    getCashInfo(session.user.id as string),
  ]);

  const { cashIn, cashOut, amount, months, userCashInfo } = cashInfo;

  return (
    <div className="container my-4 grid grid-cols-1 gap-y-4">
      {cashSet ? null : (
        <div className="w-fit rounded-md bg-destructive px-6 py-3 text-destructive-foreground">
          <p className="flex items-center gap-2">
            Iuran kas belum diatur, harap atur
            <Link href={privateRoutes.cashManage} className="underline">
              disini
            </Link>
          </p>
        </div>
      )}
      <div className="flex flex-col gap-2 sm:flex-row">
        <LinkButton variant="outline" href={privateRoutes.cashPayment}>
          <span className="flex items-center gap-2">
            Bayar <CreditCard className="h-[1.2rem] w-[1.2rem]" />
          </span>
        </LinkButton>
        <LinkButton variant="outline" href={privateRoutes.cashIn}>
          <span className="flex items-center gap-2">
            Kas Masuk <ArrowRightToLine className="h-[1.2rem] w-[1.2rem]" />
          </span>
        </LinkButton>
        <LinkButton variant="outline" href={privateRoutes.cashOut}>
          <span className="flex items-center gap-2">
            Kas Keluar <ArrowLeftFromLine className="h-[1.2rem] w-[1.2rem]" />
          </span>
        </LinkButton>
        <LinkButton variant="outline" href={privateRoutes.cashManage}>
          <span className="flex items-center gap-2">
            Kelola Pembayaran
            <Settings className="h-[1.2rem] w-[1.2rem]" />
          </span>
        </LinkButton>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Kas Masuk</CardTitle>
            <CardDescription>Periode ini</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold lg:text-5xl">
              {currencyFormat(cashIn.cashPeriod)}
            </p>
          </CardContent>
          <CardFooter>
            <div>
              <p className="text-sm text-muted-foreground">Bulan ini</p>
              <p className="font-bold">{currencyFormat(cashIn.cashMonth)}</p>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Kas Keluar</CardTitle>
            <CardDescription>Periode ini</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold lg:text-5xl">
              {currencyFormat(cashOut.cashPeriod)}
            </p>
          </CardContent>
          <CardFooter>
            <div>
              <p className="text-sm text-muted-foreground">Bulan ini</p>
              <p className="font-bold">{currencyFormat(cashOut.cashMonth)}</p>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Biaya Iuran Kas</CardTitle>
            <CardDescription>Nominal yang dibayar perbulan</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold lg:text-5xl">
              {currencyFormat(amount)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Lama Iuran Kas</CardTitle>
            <CardDescription>Jumlah bulan kas periode ini</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold lg:text-5xl">{months} Bulan</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2 lg:gap-4">
          <div className="lg:pr-6">
            <div className="space-y-1.5">
              <CardTitle>Iuran Kas Kamu</CardTitle>
              <CardDescription>Yang sudah dibayar</CardDescription>
            </div>
            <div className="pt-6">
              <p>
                <span className="text-4xl font-bold lg:text-5xl">
                  {userCashInfo.monthsPaid}
                </span>
                /{userCashInfo.monthsTotal} bulan
              </p>
              <p className="mt-6">
                {currencyFormat(userCashInfo.monthsPaidAmount)} dari total{" "}
                {currencyFormat(userCashInfo.monthsTotalAmount)}
              </p>
              <Progress
                className="mt-3"
                value={
                  (userCashInfo.monthsPaid / userCashInfo.monthsTotal) * 100
                }
              />
            </div>
          </div>
          <div className="lg:pl-6">
            <div className="space-y-1.5">
              <CardTitle>Telat bayar</CardTitle>
              <CardDescription>Kas yang telat dibayar</CardDescription>
            </div>
            <div className="pt-6">
              <p className="text-4xl font-bold lg:text-5xl">
                {userCashInfo.monthsLate} bulan
              </p>
              <p className="mt-6">Hutang yang harus dibayar</p>
              <p className="mt-2 font-bold">
                {currencyFormat(userCashInfo.monthsLateAmount)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
