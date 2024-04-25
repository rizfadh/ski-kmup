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
import Link from "next/link";
import { login } from "@/actions/loginAction";
import { useState, useTransition } from "react";
import FormAlert from "./FormAlert";
import { authRoutes } from "@/constants/routes";
import { type ActionResponse } from "@/types/ActionResponse";
import { LoginSchema } from "@/schemas/LoginSchema";

type Props = React.ComponentProps<typeof Card>;

export default function LoginForm({ className, ...props }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isError, setIsError] = useState<ActionResponse | null>(null);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      const result = await login(data);
      setIsError(result);
    });
  }

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Login</CardTitle>
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
                Login
              </Button>
            </form>
          </Form>
          <p className="text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link href={authRoutes.register} className="text-primary underline">
              Daftar disini
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
