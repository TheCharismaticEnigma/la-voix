import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Layout from './pages/Layout';
import ArtistDetailPage from './pages/ArtistDetailPage';
import HomePage from './pages/HomePage';
import QueryHomePage from './pages/QueryHomePage';

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
      {
        path: '/search',
        element: <QueryHomePage />,
      },
      {
        path: '/artist/:id',
        element: <ArtistDetailPage />,
      },

      // {
      //   path: '/album/:id',
      //   element: <AlbumDetailPage />,
      // },
    ],
  },
]);

export default router;
