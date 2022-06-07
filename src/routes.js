import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import ProductDetails from './pages/ProductDetails';
import InvestmentDetails from './pages/InvestmentDetails';
import Retention from './pages/Retention';

// ----------------------------------------------------------------------

export function ProtectedRouter() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'product-details', element: <ProductDetails /> },
        { path: 'retention', element: <Retention /> },
        { path: 'investment-details', element: <InvestmentDetails /> },
        { path: 'blog', element: <Blog /> },
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
