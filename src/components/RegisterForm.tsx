"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import Link from "next/link";
import { useState, useTransition } from "react";
import FormAlert from "./FormAlert";
import { Routes } from "@/constants/routes";
import { register } from "@/actions/register";
import { type RegisterResult } from "@/types/RegisterResult";
import { RegisterSchema } from "@/schemas/RegisterSchema";

type Props = React.ComponentProps<typeof Card>;

export default function RegsiterForm({ className, ...props }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isError, setIsError] = useState<RegisterResult | null>(null);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      phoneNumber: "",
      domicile: "",
      faculty: "",
      major: "",
      division: "",
      reason: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    startTransition(async () => {
      const result = await register(data);
      setIsError(result);
    });
  }

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Daftar</CardTitle>
        <CardDescription>Silahkan isi data berikut</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="ldkskiup@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Muhammad Rizky" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor HP</FormLabel>
                    <FormControl>
                      <Input placeholder="08xxxxx" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="domicile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domisili</FormLabel>
                    <FormControl>
                      <Input placeholder="Bogor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="faculty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fakultas</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Silahkan pilih" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="feb">Ekonomi dan Bisnis</SelectItem>
                        <SelectItem value="hukum">Hukum</SelectItem>
                        <SelectItem value="teknik">Teknik</SelectItem>
                        <SelectItem value="komunikasi">Komunikasi</SelectItem>
                        <SelectItem value="farmasi">Farmasi</SelectItem>
                        <SelectItem value="pariwisata">Pariwisata</SelectItem>
                        <SelectItem value="psikologi">Psikologi</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="major"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jurusan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Silahkan pilih" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="s1_manajemen">
                          S1 Manajemen
                        </SelectItem>
                        <SelectItem value="s1_akuntansi">
                          S1 Akuntansi
                        </SelectItem>
                        <SelectItem value="d3_akuntansi">
                          D3 Akuntansi
                        </SelectItem>
                        <SelectItem value="d3_perpajakan">
                          D3 Perpajakan
                        </SelectItem>
                        <SelectItem value="s1_hukum">S1 Hukum</SelectItem>
                        <SelectItem value="s1_arsitektur">
                          S1 Arsitektur
                        </SelectItem>
                        <SelectItem value="s1_sipil">
                          S1 Teknik Sipil
                        </SelectItem>
                        <SelectItem value="s1_mesin">
                          S1 Teknik Mesin
                        </SelectItem>
                        <SelectItem value="s1_industri">
                          S1 Teknik Industri
                        </SelectItem>
                        <SelectItem value="s1_informatika">
                          S1 Teknik Informatika
                        </SelectItem>
                        <SelectItem value="s1_elektro">
                          S1 Teknik Elektro
                        </SelectItem>
                        <SelectItem value="s1_perkeretaapian">
                          S1 Teknik Perkeretaapian
                        </SelectItem>
                        <SelectItem value="d3_mesin">
                          D3 Teknik Mesin
                        </SelectItem>
                        <SelectItem value="d3_elektro">
                          D3 Teknik Elektro
                        </SelectItem>
                        <SelectItem value="s1_komunikasi">
                          S1 Ilmu Komunikasi
                        </SelectItem>
                        <SelectItem value="s1_farmasi">S1 Farmasi</SelectItem>
                        <SelectItem value="d3_farmasi">D3 Farmasi</SelectItem>
                        <SelectItem value="s1_pariwisata">
                          S1 Pariwisata
                        </SelectItem>
                        <SelectItem value="s1_psikologi">
                          S1 Psikologi
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pilih divisi</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Silahkan pilih" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="syiar">Syiar</SelectItem>
                        <SelectItem value="kpsdm">KPSDM</SelectItem>
                        <SelectItem value="kemuslimahan">
                          Kemuslimahan
                        </SelectItem>
                        <SelectItem value="medcen">Media Center</SelectItem>
                        <SelectItem value="sarpras">
                          Sarana dan Prasarana
                        </SelectItem>
                        <SelectItem value="corporation">
                          SKI Corporation
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alasan ingin bergabung</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Saya ingin bergabung dengan SKI-KMUP karena..."
                        className="h-40 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!!isError && (
                <FormAlert
                  variant={isError.error ? "error" : "success"}
                  message={isError.message}
                />
              )}
              <Button type="submit" className="w-full" disabled={isPending}>
                Daftar
              </Button>
            </form>
          </Form>
          <p className="text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link href={Routes.login} className="text-primary underline">
              Login disini
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
