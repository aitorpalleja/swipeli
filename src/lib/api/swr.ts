import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { fetcher } from './client';

/**
 * Default SWR configuration
 */
const defaultConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateIfStale: true,
  dedupingInterval: 10000, // 10 seconds
  errorRetryCount: 3,
};

/**
 * Custom hook for data fetching with SWR
 */
export function useApi<T>(
  endpoint: string | null,
  options: RequestInit = {},
  swrOptions: SWRConfiguration = {}
): SWRResponse<T, Error> & { isLoading: boolean } {
  const { data, error, mutate, isValidating, isLoading } = useSWR<T, Error>(
    endpoint,
    endpoint ? () => fetcher<T>(endpoint, options) : null,
    {
      ...defaultConfig,
      ...swrOptions,
    }
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
} 