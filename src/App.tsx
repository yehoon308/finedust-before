import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DustPage from './pages/DustPage';
import Root from './pages/Root';
import Main from './Main';
import DustInfo from './pages/DustInfo';

// 에러 바운더리 컴포넌트
const ErrorBoundary = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'rgb(183, 198, 226)'
    }}>
      <h1>페이지를 찾을 수 없습니다 😢</h1>
      <p>요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
      <a href="/fineDustCheck" style={{
        padding: '10px 20px',
        backgroundColor: '#4a90e2',
        color: 'white',
        borderRadius: '5px',
        textDecoration: 'none',
        marginTop: '20px'
      }}>
        홈으로 돌아가기
      </a>
    </div>
  );
};

const App: React.FC = () => {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/fineDustCheck" replace />
    },
    {
      path: '/finedust',
      element: <Navigate to="/fineDustCheck" replace />
    },
    {
      path: '/fineDustCheck',
      element: <Root />,
      errorElement: <ErrorBoundary />,
      children: [
        { path: '', element: <Main /> },
        { path: 'finedust', element: <DustPage /> },
        { path: 'dust-info', element: <DustInfo /> },
      ],
    },
    {
      path: '*',
      element: <ErrorBoundary />
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;



