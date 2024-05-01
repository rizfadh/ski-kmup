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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import {
  ACCEPTED_IMAGE_MIME_TYPES,
  PostFormSchema,
} from "@/schemas/PostSchema";
import Tiptap from "./TipTap";
import { newPost } from "@/lib/postDb";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

export default function PostForm({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data: z.infer<typeof PostFormSchema>) => {
    startTransition(async () => {
      const response = await newPost({ id: userId, ...data });
      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });

      if (!response.error) router.push("/posts");
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="prose prose-sm mx-auto space-y-5 dark:prose-invert sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept={ACCEPTED_IMAGE_MIME_TYPES.join(",")}
                    onChange={(e) => {
                      if (!e.target.files) return;
                      onChange(e.target.files[0]);
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Judul"
                    className="h-auto border-none p-0 text-3xl font-black ring-0 focus-visible:border-none focus-visible:ring-0 focus-visible:ring-transparent lg:text-5xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormControl>
                  <Tiptap content={value} onChange={onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Post
          </Button>
        </form>
      </Form>
    </div>
  );
}
