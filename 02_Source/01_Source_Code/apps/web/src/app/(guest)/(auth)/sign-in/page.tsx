import Link from "next/link";

import { Page } from "@/components/layout/page";

import { PageContainer } from "../components/page-container";
import { PageFooter } from "../components/page-footer";
import { PageHeader } from "../components/page-header";
import { PageHeading } from "../components/page-heading";
import { SignInForm } from "./components/sign-in-form";

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
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </PageFooter>
      </PageContainer>
    </Page>
  );
}
