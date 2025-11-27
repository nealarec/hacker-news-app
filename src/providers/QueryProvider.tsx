import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsWithChildren } from "react";

// Configuración del persistor
const asyncStoragePersister = createAsyncStoragePersister({
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
      networkMode: "offlineFirst",
    },
  },
});

export function QueryProvider({ children }: PropsWithChildren) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semana
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
