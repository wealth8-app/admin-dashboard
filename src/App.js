// routes
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-toastify/dist/ReactToastify.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import { ProtectedRouter, PublicRouter } from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

const queryClient = new QueryClient();

// ----------------------------------------------------------------------

export default function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <p>Please wait...</p>;
  }

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <CookiesProvider>
          <QueryClientProvider client={queryClient}>
            <PublicRouter />
          </QueryClientProvider>
        </CookiesProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <ProtectedRouter />
        </QueryClientProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
}
