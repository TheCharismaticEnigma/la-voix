import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Layout from './pages/Layout';
import ArtistDetailPage from './pages/ArtistDetailPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    //
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      { path: '/artist/:id', element: <ArtistDetailPage /> },
    ],
  },
]);

export default router;
