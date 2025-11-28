import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TamaguiProvider } from "tamagui";
import { QueryProvider } from "./src/providers/QueryProvider";
import NewDetailScreen from "./src/screens/NewDetailScreen";
import NewsScreen from "./src/screens/NewsScreen";
import StartedNewsScreen from "./src/screens/StartedNewsScreen";
import HiddenNewsScreen from "./src/screens/HiddenNewsScreen";
import config from "./tamagui.config";
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback } from "react";

const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();

function tabIcon(name: React.ComponentProps<typeof MaterialIcons>["name"]) {
  return ({ size, color }: { size: number; color: string }) => (
    <MaterialIcons name={name} size={size} color={color} />
  );
}

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{ tabBarIcon: tabIcon("speaker-notes") }}
      />
      <Tab.Screen
        name="Favorites"
        component={StartedNewsScreen}
        options={{ tabBarIcon: tabIcon("favorite") }}
      />
      <Tab.Screen
        name="Hidden"
        component={HiddenNewsScreen}
        options={{ tabBarIcon: tabIcon("speaker-notes-off") }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <QueryProvider>
      <TamaguiProvider config={config} defaultTheme="light">
        <NavigationContainer>
          <MainStack.Navigator>
            <MainStack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={TabScreen}
            />
            <MainStack.Screen
              name="NewDetail"
              options={{ title: "New Detail" }}
              component={NewDetailScreen}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </TamaguiProvider>
    </QueryProvider>
  );
}
