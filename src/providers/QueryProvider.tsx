import { QueryClient } from "@tanstack/react-query";
import {
  persistQueryClient,
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsWithChildren, useEffect } from "react";
import { useNetInfo } from "../hooks/useNetInfo";

// Configuración del persistor
export const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  // Opcional: personaliza la clave de almacenamiento
  // key: 'QUERY_CACHE',
});

// Configuración del QueryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 horas
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: 2,
      networkMode: "online",
    },
  },
});

export const persistedQueryClient = async () => {
  const [unsubscribe, persist] = persistQueryClient({
    queryClient,
    persister: asyncStoragePersister,
  });

  await persist;

  return [unsubscribe, queryClient] as const;
};

export function QueryProvider({ children }: PropsWithChildren) {
  const online = useNetInfo();
  useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        // just 5 min if online / a week if not
        gcTime: online.isConnected ? 1000 * 60 * 5 : 1000 * 60 * 60 * 24,
        staleTime: online.isConnected ? 1000 * 60 * 5 : 1000 * 60 * 60 * 24,
        networkMode: online.isConnected ? "always" : "offlineFirst",
      },
    });
  }, [online.isConnected]);
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        // just 5 min if online / a week if not
        maxAge: online.isConnected ? 1000 * 60 * 5 : 1000 * 60 * 60 * 24 * 7,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            // Opcional: personaliza qué queries se persisten
            return query.queryKey[0] !== "sensitiveData";
          },
        },
      }}
      onSuccess={() => {
        // Reanudar mutaciones pausadas cuando se restaura el caché
        queryClient.resumePausedMutations();
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
