import { NavigationContainer } from "@react-navigation/native";
 import { createNativeStackNavigator } from "@react-navigation/native-stack";
 import { SafeAreaProvider } from "react-native-safe-area-context";

 import HomeScreen from "./src/components/HomeScreen";
 import CartScreen from "./src/components/CartScreen";

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CartScreen"
          component={CartScreen}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
   
    </SafeAreaProvider>
    
  );
};
export default App;

