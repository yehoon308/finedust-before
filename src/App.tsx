import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DustPage from './pages/DustPage';
import Root from './pages/Root';
import Main from './Main';
import DustInfo from './pages/DustInfo';

const App: React.FC = () => {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: '/finedust',
      element: <Root />,
      errorElement: <p>Not Found 😢</p>,
      children: [
        { path: 'fineDust', element: <DustPage /> },
        { path: 'dust-info', element: <DustInfo /> },
        { path: '', element: <Main /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
