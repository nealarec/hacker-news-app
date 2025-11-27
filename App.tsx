import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TamaguiProvider } from "tamagui";
import { QueryProvider } from "./src/providers/QueryProvider";
import NewDetailScreen from "./src/screens/NewDetailScreen";
import NewsScreen from "./src/screens/NewsScreen";
import config from "./tamagui.config";

const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="News" component={NewsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <QueryProvider>
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
      </QueryProvider>
    </TamaguiProvider>
  );
}
