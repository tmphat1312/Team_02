import { BrowserRouter, Route, Routes } from 'react-router';

import { Amenities } from './routes/Amenities';
import { Categories } from './routes/Categories';
import { Login } from './routes/Login';
import { Properties } from './routes/Properties';
import { Users } from './routes/Users';
import { Dashboard } from './components/layout/Dashboard';

export function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Dashboard />}>
          <Route path="/users" element={<Users />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/categories" element={<Categories />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
