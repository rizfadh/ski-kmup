import { Check, CircleHelp, X } from "lucide-react";

export default function PlanConfirmIcon({
  isConfirmed,
}: {
  isConfirmed?: boolean | null;
}) {
  if (isConfirmed) {
    return <Check className="h-[1.2rem] w-[1.2rem]" />;
  }

  if (isConfirmed === false) {
    return <X className="h-[1.2rem] w-[1.2rem]" />;
  }

  return <CircleHelp className="h-[1.2rem] w-[1.2rem]" />;
}
