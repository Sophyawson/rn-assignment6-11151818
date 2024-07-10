import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./src/components/HomeScreen";
import CartScreen from "./src/components/CartScreen";
import ProductDetailScreen from './src/components/ProductDetailScreen';
import DrawerScreen from './src/components/DrawerScreen';
import BlogScreen from './src/components/BlogScreen';
import JewelleryScreen from './src/components/JewelleryScreen';
import ElectronicScreen from './src/components/ElectronicScreen';


const Drawer = createDrawerNavigator();


const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator 
          initialRouteName="Store"
          drawerContent={(props) => <DrawerScreen {...props} />}
        >
          <Drawer.Screen
            options={{ headerShown: false }}
            name="Store"
            component={HomeScreen}
          />
          <Drawer.Screen
            options={{ headerShown: false }}
            name="Location"
            component={CartScreen}
          />
          <Drawer.Screen
            options={{ headerShown: false }}
            name="Clothing"
            component={ProductDetailScreen}
          />
            <Drawer.Screen
            options={{ headerShown: false }}
            name="BlogScreen"
            component={BlogScreen}
          />
            <Drawer.Screen
            options={{ headerShown: false }}
            name="JewelleryScreen"
            component={JewelleryScreen}
          />
            <Drawer.Screen
            options={{ headerShown: false }}
            name="ElectronicScreen"
            component={ElectronicScreen}
          />
         
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
