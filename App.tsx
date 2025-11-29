import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  setNotificationHandler,
  getPermissionsAsync,
  requestPermissionsAsync,
} from "expo-notifications";
import { useEffect } from "react";
import { TamaguiProvider } from "tamagui";
import { useRegisterTasks } from "./src/background/fetchArticleTasks";
import { useNotificationRedirect } from "./src/hooks/useNotificationRedirect";
import { QueryProvider } from "./src/providers/QueryProvider";
import HiddenNewsScreen from "./src/screens/HiddenNewsScreen";
import NewDetailScreen from "./src/screens/NewDetailScreen";
import NewsScreen from "./src/screens/NewsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import StartedNewsScreen from "./src/screens/StartedNewsScreen";
import config from "./tamagui.config";
import useDefaultSettings from "./src/hooks/useDefaultSettings";

setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();

function tabIcon(name: React.ComponentProps<typeof MaterialIcons>["name"]) {
  return ({ size, color }: { size: number; color: string }) => (
    <MaterialIcons name={name} size={size} color={color} />
  );
}

const TabScreen = () => {
  useNotificationRedirect();
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
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarIcon: tabIcon("settings") }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    (async () => {
      const permissions = await getPermissionsAsync();
      if (permissions?.status !== "granted") requestPermissionsAsync();
    })();
  }, []);

  useRegisterTasks();
  useDefaultSettings();

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
