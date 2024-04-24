import NavBarAuth from "@/components/NavBarAuth";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBarAuth className="md:fixed md:min-h-screen md:w-52 md:border-r" />
      <main className="md:ml-52">{children}</main>
    </>
  );
}
