import { Grid } from "@/components/layout/grid";
import { Page } from "@/components/layout/page";
import { getServerSession } from "@/features/auth/data/get-server-session";

import { ProfileCard } from "./components/profile-card";
import { ProfileContent } from "./components/profile-content";

export default async function ProfilePage() {
  const session = await getServerSession();
  const user = session!.user;

  return (
    <Page>
      <Grid className="items-start gap-8 grid-cols-[18rem_1fr]">
        <ProfileCard user={user} />
        <ProfileContent />
      </Grid>
    </Page>
  );
}
