import HomeButton from "@/components/HomeButton";
import RegsiterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="container grid min-h-screen">
      <div className="my-8 grid content-center gap-2 sm:justify-center">
        <HomeButton />
        <RegsiterForm className="w-full sm:w-[360px]" />
      </div>
    </div>
  );
}
