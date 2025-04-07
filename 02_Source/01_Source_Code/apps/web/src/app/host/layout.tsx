export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This layout is used for the host app to check for authentication
  // This layout is for host only
  // It is not used for tenant apps

  return children;
}
