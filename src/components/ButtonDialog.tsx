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
import { ComponentProps, ComponentType } from "react";

interface Props extends ComponentProps<typeof Button> {
  Icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  isDisabled: boolean;
  action: () => void;
}

export default function ButtonDialog({
  Icon,
  title,
  description,
  isDisabled,
  action,
  className,
  ...props
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={className}
          disabled={isDisabled}
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
          <AlertDialogAction onClick={action}>Ya</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
