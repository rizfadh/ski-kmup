import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useTransition } from "react";
import {
  ACCEPTED_IMAGE_MIME_TYPES,
  PostFormSchema,
} from "@/schemas/PostSchema";
import Tiptap from "./TipTap";
import { addPost } from "@/actions/postsAction";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { ActionResponse } from "@/types/ActionResponse";

type Props = {
  id: string;
  Schema: ZodType;
  setImagePreview: Dispatch<SetStateAction<String | undefined>>;
  title?: string;
  content?: string;
  submitAction: (formData: FormData) => Promise<ActionResponse>;
  toRoute: string;
};

export default function PostForm({
  id,
  Schema,
  setImagePreview,
  title,
  content,
  submitAction,
  toRoute,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      title,
      content,
    },
  });

  const onSubmit = (data: z.infer<typeof Schema>) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("image", data.image);
      formData.append("title", data.title);
      formData.append("content", data.content);

      const response = await submitAction(formData);

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });

      if (!response.error) router.push(toRoute);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    setImagePreview(URL.createObjectURL(e.target.files[0]));
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
                  className="h-auto border-none p-0 text-3xl font-black ring-0 focus-visible:border-none focus-visible:ring-0 focus-visible:ring-transparent lg:text-6xl"
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
  );
}
