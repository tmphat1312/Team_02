export function Dot(props: React.ComponentProps<"span">) {
  return (
    <span role="presentation" aria-hidden {...props}>
      ·
    </span>
  );
}
