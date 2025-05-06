type PageSectionProps = {
  heading: string;
} & React.ComponentProps<"section">;

export function PageSection({
  heading,
  children,
  ...props
}: PageSectionProps) {
  return (
    <section {...props}>
      <h2 className="text-3xl font-medium mb-6">{heading}</h2>
      {children}
    </section>
  );
}
