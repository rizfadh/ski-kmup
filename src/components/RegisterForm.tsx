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
import { authRoutes } from "@/constants/routes";
import { register } from "@/actions/registerAction";
import { type ActionResponse } from "@/types/ActionResponse";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { userDivision, userFaculty, userMajor } from "@/constants/userData";
import { useRouter } from "next/navigation";

type Props = React.ComponentProps<typeof Card>;

export default function RegsiterForm({ className, ...props }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isError, setError] = useState<ActionResponse | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      phoneNumber: "",
      domicile: "",
      faculty: "",
      major: "",
      division_1: "",
      division_2: "",
      reason: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    startTransition(async () => {
      const result = await register(data);
      setError(result);

      if (!result.error) {
        setTimeout(() => {
          router.push(authRoutes.login);
        }, 2000);
      }
    });
  }

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Daftar</CardTitle>
        <CardDescription>Silahkan isi data berikut</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-y-5">
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
                        {Object.entries(userFaculty).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
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
                        {Object.entries(userMajor).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="division_1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opsi divisi 1</FormLabel>
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
                        {Object.entries(userDivision).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="division_2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opsi divisi 2</FormLabel>
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
                        {Object.entries(userDivision).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
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
            <Link href={authRoutes.login} className="text-primary underline">
              Login disini
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
