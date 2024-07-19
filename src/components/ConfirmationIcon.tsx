import { cn } from "@/lib/utils";
import { CircleCheck, CircleHelp, CircleX } from "lucide-react";

interface Props extends React.ComponentPropsWithoutRef<"p"> {
  isConfirmed?: boolean | null;
  label: string;
}

export default function ConfirmationIcon({
  isConfirmed,
  label,
  className,
}: Props) {
  if (isConfirmed) {
    return (
      <p className={cn("flex items-center gap-2 text-primary", className)}>
        {label}
        <CircleCheck className="h-[1.2rem] w-[1.2rem]" />
      </p>
    );
  }

  if (isConfirmed === false) {
    return (
      <p className={cn("flex items-center gap-2 text-destructive", className)}>
        {label}
        <CircleX className="h-[1.2rem] w-[1.2rem]" />
      </p>
    );
  }

  return (
    <p
      className={cn("flex items-center gap-2 text-muted-foreground", className)}
    >
      {label}
      <CircleHelp className="h-[1.2rem] w-[1.2rem]" />
    </p>
  );
}
