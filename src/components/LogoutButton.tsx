import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "@/auth";

type Props = React.ComponentProps<typeof Button>;

export default function LogoutButton({ className, ...props }: Props) {
  return (
    <form
      action={async () => {
        "use server";

        await signOut();
      }}
    >
      <Button
        type="submit"
        variant="outline"
        className={cn("w-fit gap-2", className)}
        {...props}
      >
        Logout
        <LogOut className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </form>
  );
}
