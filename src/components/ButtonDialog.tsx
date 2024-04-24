import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { ComponentProps, ComponentType, useTransition } from "react";

interface Props extends ComponentProps<typeof Button> {
  id: string;
  Icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action: (id: string) => Promise<void>;
}

export default function ButtonDialog({
  id,
  Icon,
  title,
  description,
  action,
  className,
  ...props
}: Props) {
  const [isPending, startTransition] = useTransition();

  const onClickHandler = (id: string) => {
    startTransition(async () => {
      await action(id);
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={className}
          disabled={isPending}
          {...props}
        >
          <Icon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{title}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={() => onClickHandler(id)}>
            Ya
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
