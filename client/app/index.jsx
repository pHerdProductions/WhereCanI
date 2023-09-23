import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './loginsignup'
import SearchPage from './search'
import MapPage from './map'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='login' component={LoginPage} />
        <Stack.Screen name='search' component={SearchPage}  />
        <Stack.Screen name='map' component={MapPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}