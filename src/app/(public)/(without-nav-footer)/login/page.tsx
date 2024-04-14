import BackButton from "@/components/BackButton";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="container grid min-h-screen">
      <div className="grid content-center gap-2 sm:justify-center">
        <BackButton />
        <LoginForm className="w-full sm:w-[360px]" />
      </div>
    </div>
  );
}
