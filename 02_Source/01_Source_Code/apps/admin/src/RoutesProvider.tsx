import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { AuthLayout } from './components/layout/Auth';
import { DashboardLayout } from './components/layout/Dashboard';
import { ProtectedLayout } from './components/layout/Protected';

const Properties = lazy(() => import('./routes/Properties'));
const Categories = lazy(() => import('./routes/Categories'));
const Amenities = lazy(() => import('./routes/Amenities'));
const Dashboard = lazy(() => import('./routes/Dashboard'));
const Login = lazy(() => import('./routes/Login'));
const Users = lazy(() => import('./routes/Users'));

export function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/categories" element={<Categories />} />
          </Route>
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
