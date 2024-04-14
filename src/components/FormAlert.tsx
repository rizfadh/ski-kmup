import { cn } from "@/lib/utils";
import { CircleCheck, TriangleAlert } from "lucide-react";

const alertVariant = {
  error: {
    icon: <TriangleAlert />,
    bgColor: "bg-destructive/15",
    textColor: "text-destructive",
  },
  success: {
    icon: <CircleCheck />,
    bgColor: "bg-emerald-200",
    textColor: "text-primary",
  },
};

interface Props extends React.ComponentProps<"div"> {
  variant: keyof typeof alertVariant;
  message: string;
}

export default function FormAlert({
  variant,
  message,
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        `rounded-md px-3 py-2 ${alertVariant[variant].bgColor}`,
        className,
      )}
      {...props}
    >
      <p
        className={`flex items-center gap-3 text-sm ${alertVariant[variant].textColor}`}
      >
        {alertVariant[variant].icon} {message}
      </p>
    </div>
  );
}
