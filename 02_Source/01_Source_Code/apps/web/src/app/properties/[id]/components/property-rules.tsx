import { Rule } from "@/app/typings/models";
import { Grid } from "@/components/layout/grid";
import { PageSubHeading } from "@/components/typography/page-sub-heading";

type PropertyRulesProps = {
  items: Rule[];
};

export function PropertyRules({ items }: PropertyRulesProps) {
  return (
    <section>
      <PageSubHeading>Things to know</PageSubHeading>
      <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((rule) => (
          <div key={rule.id} className="p-2 border-b flex items-center">
            {rule.name}
          </div>
        ))}
      </Grid>
    </section>
  );
}
