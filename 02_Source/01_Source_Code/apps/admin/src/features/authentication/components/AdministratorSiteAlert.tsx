import { AdminIcon } from '../../../components/icons/Admin';

export function AdministratorSiteAlert() {
  return (
    <section className="max-w-[40ch] rounded-lg bg-indigo-600 px-8 py-14 text-white">
      <p className="sr-only">Rento administrator application</p>
      <h1 aria-hidden className="mb-3.5 text-3xl font-medium">
        Welcome
      </h1>
      <p aria-hidden className="mb-8 text-sm">
        Welcome to the administrator application for the Rento platform. This
        site is designed exclusively for authorized users who manage and oversee
        the operations of the Rento application. Please ensure that you have the
        proper credentials to access this portal.
      </p>
      <AdminIcon />
    </section>
  );
}
