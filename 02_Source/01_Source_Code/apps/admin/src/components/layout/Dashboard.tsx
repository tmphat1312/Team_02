import { Outlet } from 'react-router';

export function Dashboard() {
  return (
    <main>
      <header>header</header>
      <Outlet />
      <footer>footer</footer>
    </main>
  );
}
