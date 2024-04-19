export default function PublicWithoutNavFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
