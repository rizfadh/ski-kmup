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
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import suggestion from "../../public/suggestion.svg";
import { AdviceSchema } from "@/schemas/AdviceSchema";
import { useState, useTransition } from "react";
import FormAlert from "./FormAlert";
import { type ActionResponse } from "@/types/ActionResponse";
import { submitAdvice } from "@/actions/advicesAction";

export default function AdviceForm() {
  const [isError, setError] = useState<ActionResponse | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AdviceSchema>>({
    resolver: zodResolver(AdviceSchema),
    defaultValues: {
      email: "",
      adviceFor: "",
      advice: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof AdviceSchema>) {
    startTransition(async () => {
      const result = await submitAdvice(values);
      setError(result);
    });
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="grid content-center gap-4 lg:justify-center lg:gap-8">
        <h2 className="text-2xl font-bold lg:text-center lg:text-4xl lg:text-primary">
          Punya Saran?
        </h2>
        <Image
          src={suggestion}
          alt="suggestion illustration"
          className="h-auto w-full max-w-[200px] lg:max-w-[400px]"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Ketik saranmu disini</CardTitle>
          <CardDescription>
            Kalimat harap tidak mengandung ujaran kebencian
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email kamu</FormLabel>
                    <FormControl>
                      <Input placeholder="ldkskiup@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adviceFor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Saran untuk?</FormLabel>
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
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="ski_kmup">SKI-KMUP</SelectItem>
                        <SelectItem value="other">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="advice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Saran</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Saya ingin memberikan saran berupa..."
                        className="h-40 resize-none"
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
              <Button type="submit" disabled={isPending}>
                Kirim
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
