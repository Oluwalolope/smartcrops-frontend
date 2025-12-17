import HomePage from './pages/Home';
import { createBrowserRouter } from 'react-router';
import NotFoundPage from './pages/NotFound';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader';

const DashBoard = lazy(() => import('./pages/Dashboard'));

const router = createBrowserRouter([
  {
    path: '*',
    errorElement: <NotFoundPage />,
},
{
  path: '/',
  element: <HomePage />,
  errorElement: <NotFoundPage />,
},
  {
    path: '/dashboard',
    element: 
    <Suspense fallback={<Loader />}>
      <DashBoard />
    </Suspense>,
  },
]);

export default router;