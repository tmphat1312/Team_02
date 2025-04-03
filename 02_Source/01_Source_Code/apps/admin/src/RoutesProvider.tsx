import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { AuthLayout } from './components/layout/Auth';
import { DashboardLayout } from './components/layout/Dashboard';
import { ProtectedLayout } from './components/layout/Protected';

const CommonRules = lazy(() => import('./routes/CommonRules'));
const Categories = lazy(() => import('./routes/Categories'));
const Amenities = lazy(() => import('./routes/Amenities'));
const Login = lazy(() => import('./routes/Login'));

export function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/amenities" />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route element={<DashboardLayout />}>
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/common-rules" element={<CommonRules />} />
          </Route>
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
