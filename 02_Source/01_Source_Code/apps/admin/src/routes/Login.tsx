import { AdministratorSiteAlert } from '../features/authentication/components/AdministratorSiteAlert';
import { LoginForm } from '../features/authentication/components/LoginForm';

export default function Login() {
  return (
    <div className="flex rounded-lg bg-white shadow-lg">
      <AdministratorSiteAlert />
      <LoginForm />
    </div>
  );
}
