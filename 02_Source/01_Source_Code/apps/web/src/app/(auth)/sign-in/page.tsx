import Link from "next/link";

import { Page } from "@/components/layout/page";

import { PageContainer } from "../components/page-container";
import { SignInForm } from "./_components/sign-in-form";
import { PageHeader } from "../components/page-header";
import { PageHeading } from "../components/page-heading";
import { PageFooter } from "../components/page-footer";

export default function SignInPage() {
  return (
    <Page className="pt-12">
      <PageContainer>
        <PageHeader>
          <PageHeading>Log in</PageHeading>
        </PageHeader>

        <SignInForm />

        <PageFooter>
          <span>Don&apos;t have an account?&nbsp;</span>
          <Link
            href="/sign-up"
            className="text-airbnb hover:underline font-medium"
          >
            Sign up
          </Link>
        </PageFooter>
      </PageContainer>
    </Page>
  );
}
