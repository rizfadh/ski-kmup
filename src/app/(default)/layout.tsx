import { auth } from "@/auth";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import NavBarAuth from "@/components/NavBarAuth";
import { Toaster } from "@/components/ui/toaster";

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isLoggedIn = !session || !session.user;

  return (
    <>
      {isLoggedIn ? (
        <NavBar />
      ) : (
        <NavBarAuth className="md:fixed md:min-h-screen md:w-52 md:border-r" />
      )}
      <main className={isLoggedIn ? "" : "md:ml-52"}>{children}</main>
      <Toaster />
      {isLoggedIn ? <Footer /> : null}
    </>
  );
}
