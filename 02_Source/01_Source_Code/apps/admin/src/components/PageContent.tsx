export function PageContent({
  children,
  label,
  PageActionComponent,
}: {
  label: string;
  children: React.ReactNode;
  PageActionComponent?: React.ReactNode;
}) {
  return (
    <section className="space-y-5 py-2">
      {PageActionComponent ? (
        <div className="flex items-center justify-between">
          <PageHeading label={label} />
          {PageActionComponent}
        </div>
      ) : (
        <PageHeading label={label} />
      )}
      {children}
    </section>
  );
}

function PageHeading({ label }: { label: string }) {
  return <h1 className="text-2xl font-medium">{label}</h1>;
}
