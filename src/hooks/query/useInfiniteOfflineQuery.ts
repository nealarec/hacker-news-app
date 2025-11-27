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

          if (cachedData?.pages[pageParam]) {
            return cachedData.pages[pageParam];
          }

          // Si no hay datos en caché para la página solicitada, devolver la última página disponible
          if (cachedData?.pages.length) {
            return cachedData.pages[cachedData.pages.length - 1];
          }
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
