import { Logo } from '../components/Logo';
import { AdministratorSiteAlert } from '../features/authentication/components/AdministratorSiteAlert';
import { LoginForm } from '../features/authentication/components/LoginForm';

export default function Login() {
  return (
    <div className="flex rounded-lg bg-white shadow-lg">
      <AdministratorSiteAlert />
      <div className="space-y-8 p-12">
        <Logo />
        <LoginForm />
      </div>
    </div>
  );
}
