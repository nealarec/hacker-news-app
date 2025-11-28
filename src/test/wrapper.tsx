import { NavigationContainer } from "@react-navigation/native";
import { TamaguiProvider } from "tamagui";
import config from "../../tamagui.config";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <NavigationContainer>
      <TamaguiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </TamaguiProvider>
    </NavigationContainer>
  );
}
