import {
  useInfiniteQuery,
  useQueryClient,
  UseInfiniteQueryOptions,
  InfiniteData,
  QueryKey,
} from "@tanstack/react-query";
import { isNetworkError } from "../../utils/isNetworkError";

interface PaginatedResponse {
  hits: any[];
  page: number;
  nbPages: number;
}

type UseInfiniteOfflineQueryOptions<TData extends PaginatedResponse> = {
  queryKey: QueryKey;
  queryFn: (pageParam: number) => Promise<TData>;
} & Omit<
  UseInfiniteQueryOptions<TData, Error, InfiniteData<TData>, QueryKey, number>,
  "queryFn"
>;

export function useInfiniteOfflineQuery<TData extends PaginatedResponse>({
  queryKey,
  queryFn,
  initialPageParam = 0,
  getNextPageParam = (lastPage) =>
    lastPage.page < lastPage.nbPages - 1 ? lastPage.page + 1 : null,
  staleTime = 1000 * 60 * 5, // 5 minutos
  enabled = true,
  ...options
}: UseInfiniteOfflineQueryOptions<TData>) {
  const queryClient = useQueryClient();

  return useInfiniteQuery<TData, Error, InfiniteData<TData>, QueryKey, number>({
    queryKey,
    queryFn: async ({ pageParam = initialPageParam }) => {
      try {
        return await queryFn(pageParam);
      } catch (error) {
        if (isNetworkError(error)) {
          // Intentar obtener datos de la caché
          const cachedData =
            queryClient.getQueryData<InfiniteData<TData>>(queryKey);

          const findPage = cachedData?.pages.find(
            (page) => page.page === pageParam
          );

          if (findPage) return findPage;

          throw error;
        }
        throw error;
      }
    },
    initialPageParam,
    getNextPageParam,
    staleTime,
    enabled,
    ...options,
  });
}
