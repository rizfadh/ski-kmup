export default function WithoutNavFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
