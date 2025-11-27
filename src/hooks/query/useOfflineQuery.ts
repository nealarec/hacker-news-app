import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isNetworkError } from "../../utils/isNetworkError";

type UseOfflineQueryOptions<T> = {
  queryKey: any[];
  queryFn: () => Promise<T>;
  staleTime?: number;
  enabled?: boolean;
};

export function useOfflineQuery<T>({
  queryKey,
  queryFn,
  staleTime = 1000 * 60 * 5, // 5 minutos
  enabled = true,
}: UseOfflineQueryOptions<T>) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey,
    queryFn: async () =>
      Promise.resolve(queryFn()).catch((error) => {
        if (isNetworkError(error)) {
          const cachedData = queryClient.getQueryData<T>(queryKey);
          if (cachedData) return cachedData;
        }
        throw error;
      }),
    staleTime,
    retry: 2,
    networkMode: "offlineFirst",
    enabled,
  });
}
