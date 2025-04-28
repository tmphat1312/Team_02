import { User } from "@/app/typings/models";

import { DeleteAccountForm } from "./delete-account-form";
import { UpdateEmailForm } from "./update-email-form";
import { UpdatePasswordForm } from "./update-password-form";
import { VerifyEmailForm } from "./verify-email-form";
import { Separator } from "@/components/ui/separator";

type UpdateLoginFormProps = {
  user: User;
};

export function UpdateLoginForm({ user }: UpdateLoginFormProps) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-4 text-2xl">Login</h3>
        <div className="space-y-4">
          <UpdateEmailForm user={user} />
          <Separator />
          <VerifyEmailForm />
          <Separator />
          <UpdatePasswordForm />
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-2xl">Account</h3>
        <DeleteAccountForm />
      </section>
    </div>
  );
}
