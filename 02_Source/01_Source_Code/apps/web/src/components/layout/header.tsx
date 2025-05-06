type HeaderProps = {
  children?: React.ReactNode;
};

export function Header({ children }: HeaderProps) {
  return (
    <header className="border-b sticky top-0 z-50 bg-background">
      {children}
    </header>
  );
}
