import { Grid } from "@/components/layout/grid";
import { Page } from "@/components/layout/page";

import { ProfileCard } from "./components/profile-card";
import { ProfileContent } from "./components/profile-content";

export default async function ProfilePage() {
  return (
    <Page>
      <Grid className="items-start gap-8 grid-cols-[18rem_1fr]">
        <ProfileCard />
        <ProfileContent />
      </Grid>
    </Page>
  );
}
