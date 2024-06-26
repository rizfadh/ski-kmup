import { HomeButton } from "@/components/NavButton";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="container grid min-h-screen">
      <div className="my-4 grid content-center gap-2 sm:justify-center">
        <HomeButton />
        <LoginForm className="w-full sm:w-[360px]" />
      </div>
    </div>
  );
}
