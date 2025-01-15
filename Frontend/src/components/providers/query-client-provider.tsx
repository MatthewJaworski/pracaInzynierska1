'use client';
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
type QueryClientProviderProps = {
  children: React.ReactNode;
};

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 60 * 1000,
      gcTime: 60 * 1000
    }
  }
};

const makeQueryClient = () => {
  return new QueryClient(queryClientConfig);
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

export const AppQueryClientProvider = ({
  children
}: QueryClientProviderProps) => {
  const queryClient = getQueryClient();
  return (
    // @ts-ignore
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
