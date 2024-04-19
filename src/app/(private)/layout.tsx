import NavBarAuth from "@/components/NavBarAuth";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBarAuth />
      <main>{children}</main>
    </>
  );
}
