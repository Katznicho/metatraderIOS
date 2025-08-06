import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axios/axios';

// Type for the parameters that can be passed to the useApi hook
type ApiParams = {
  endpoint: string;
  params?: any;
  queryOptions?: QueryOptions;
};

type ApiResponse<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => void;
};

type QueryOptions = {
  enabled?: boolean;
  cacheTime?: number;
  staleTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
  refetchInterval?: number | false;
  retry?: number;
  retryDelay?: number;
  onError?: (error: AxiosError) => void;
  onSuccess?: (response: AxiosResponse) => void;
  onSettled?: (data: any, error: AxiosError | null) => void;
};

export function usePostQuery<T>({ endpoint, params, queryOptions }: ApiParams): ApiResponse<T> {
  const fetcher = async (): Promise<any> => {
    try {
      const { data } = await axiosInstance.post<T>(endpoint, { params });
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'There was an error fetching data');
    }
  };

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery<T>({
    queryKey: [endpoint, params], // ✅ TanStack v4 requires this as an array
    queryFn: fetcher,
    enabled: queryOptions?.enabled,
    refetchOnWindowFocus: queryOptions?.refetchOnWindowFocus,
    refetchOnMount: queryOptions?.refetchOnMount,
    refetchInterval: queryOptions?.refetchInterval,
    retry: queryOptions?.retry,
    staleTime: queryOptions?.staleTime,
    cacheTime: queryOptions?.cacheTime,
  });

  return {
    data: data || null,
    error: isError ? new Error('Something went wrong') : null,
    isLoading,
    refetch,
  };
}


// const { data: products, error, isLoading, refetch } = useApi<Product[]>({
//   endpoint: '/api/products',
//   queryOptions: {
//     enabled: true,
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     retry: 2,
//   },
// });