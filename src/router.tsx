import { createBrowserRouter } from 'react-router-dom';
import AlbumDetailPage from './pages/AlbumDetailPage';
import ArtistDetailPage from './pages/ArtistDetailPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import Layout from './pages/Layout';
import LoginPage from './pages/LoginPage';
import PlaylistDetailPage from './pages/PlaylistDetailPage';
import QueryHomePage from './pages/QueryHomePage';
import ShowDetailPage from './pages/ShowDetailPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
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

      {
        path: '/album/:id',
        element: <AlbumDetailPage />,
      },

      {
        path: '/playlist/:id',
        element: <PlaylistDetailPage />,
      },

      {
        path: '/show/:id',
        element: <ShowDetailPage />,
      },
    ],
  },
]);

export default router;
