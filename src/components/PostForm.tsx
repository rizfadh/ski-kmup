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
import { Dispatch, SetStateAction, useTransition } from "react";
import {
  ACCEPTED_IMAGE_MIME_TYPES,
  PostFormSchema,
  PostFormUpdateSchema,
} from "@/schemas/PostSchema";
import Tiptap from "./TipTap";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { privateRoutes, publicRoutes } from "@/constants/routes";
import { addPost, updatePost } from "@/actions/postsAction";

type PostFormNewProps = {
  setImagePreview: Dispatch<SetStateAction<String | undefined>>;
};

export function PostFormNew({ setImagePreview }: PostFormNewProps) {
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
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("title", data.title);
      formData.append("content", data.content);

      const response = await addPost(formData);

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });

      if (!response.error) router.push(publicRoutes.posts);
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

type PostFormUpdate = {
  id: string;
  setImagePreview: Dispatch<SetStateAction<String>>;
  title: string;
  content: string;
};

export function PostFormUpdate({
  id,
  setImagePreview,
  title,
  content,
}: PostFormUpdate) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof PostFormUpdateSchema>>({
    resolver: zodResolver(PostFormUpdateSchema),
    defaultValues: {
      title,
      content,
    },
  });

  const onSubmit = (data: z.infer<typeof PostFormUpdateSchema>) => {
    startTransition(async () => {
      const formData = new FormData();

      if (data.image) formData.append("image", data.image);

      formData.append("id", id);
      formData.append("title", data.title);
      formData.append("content", data.content);

      const response = await updatePost(formData);

      toast({
        title: response.error ? "Gagal" : "Sukses",
        description: response.message,
        variant: response.error ? "destructive" : "default",
      });

      if (!response.error) router.push(privateRoutes.postsManage);
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
          Update
        </Button>
      </form>
    </Form>
  );
}
