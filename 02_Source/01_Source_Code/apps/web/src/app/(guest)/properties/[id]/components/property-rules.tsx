import { Rule } from "@/typings/models";
import { Grid } from "@/components/layout/grid";
import { PageSubHeading } from "@/components/typography/page-sub-heading";

type PropertyRulesProps = {
  items: Rule[];
};

export function PropertyRules({ items }: PropertyRulesProps) {
  return (
    <section>
      <PageSubHeading>Things to know</PageSubHeading>
      <Grid className="grid-cols-3 gap-x-3 gap-y-2">
        {items.map((rule) => (
          <div key={rule.id} className="p-2 flex items-start">
            {rule.name}
          </div>
        ))}
      </Grid>
    </section>
  );
}
