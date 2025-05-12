import Link from "next/link";

import { Page } from "@/components/layout/page";

import { PageContainer } from "../components/page-container";
import { PageFooter } from "../components/page-footer";
import { PageHeader } from "../components/page-header";
import { PageHeading } from "../components/page-heading";
import SignUpForm from "./_components/sign-up-form";

export default function SignUpPage() {
  return (
    <Page>
      <PageContainer>
        <PageHeader>
          <PageHeading>Sign up</PageHeading>
        </PageHeader>
        <SignUpForm />
        <PageFooter>
          Already have an account?&nbsp;
          <Link
            href="/sign-in"
            className="text-airbnb font-medium hover:underline"
          >
            Log in
          </Link>
        </PageFooter>
      </PageContainer>
    </Page>
  );
}
