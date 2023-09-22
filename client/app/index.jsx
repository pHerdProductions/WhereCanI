import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./loginsignup"
import Map from "./map"

import SearchPage from "./search"


// import Search from "./search"
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} options={{title: 'Welcome'}} />
        <Stack.Screen name="search" component={SearchPage} />
        <Stack.Screen name="map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}