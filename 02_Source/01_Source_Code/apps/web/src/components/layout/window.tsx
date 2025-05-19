export function GridWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh grid grid-rows-[auto_1fr_auto]">{children}</div>
  );
}

export function FlexWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col [&_main]:grow">{children}</div>
  );
}
