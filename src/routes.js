import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

import Users from './pages/users';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import ProductDetails from './pages/ProductDetails';
import InvestmentDetails from './pages/InvestmentDetails';
import Retention from './pages/Retention';
import Mandates from './pages/Mandates';
import Payments from './pages/Payments';
import Subscriptions from './pages/Subscriptions';
import Bonuses from './pages/Bonuses';

// ----------------------------------------------------------------------

export function ProtectedRouter() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'users', element: <Users /> },
        { path: 'product-details', element: <ProductDetails /> },
        { path: 'retention', element: <Retention /> },
        { path: 'investment-details', element: <InvestmentDetails /> },
        { path: 'mandates', element: <Mandates /> },
        { path: 'payments', element: <Payments /> },
        { path: 'subscriptions', element: <Subscriptions /> },
        { path: 'bonuses', element: <Bonuses /> },
        { path: '*', element: <Navigate to="/dashboard/app" /> },
      ],
    },
    { path: '*', element: <Navigate to="/dashboard/app" replace /> },
  ]);
}

export function PublicRouter() {
  return useRoutes([
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/login" /> },
      ],
    },
    { path: '*', element: <Navigate to="/login" replace /> },
  ]);
}
