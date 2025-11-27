import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { QueryProvider } from "./src/providers/QueryProvider";
import NewsScreen from "./src/screens/NewsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <QueryProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="News" component={NewsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryProvider>
  );
}
