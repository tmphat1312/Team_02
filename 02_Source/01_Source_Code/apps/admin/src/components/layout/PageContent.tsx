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
    <section>
      {PageActionComponent ? (
        <div className="mb-4 flex items-center justify-between">
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
  return <h1 className="mb-4 text-3xl">{label}</h1>;
}
