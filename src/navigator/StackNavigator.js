import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from '../screens/WelcomeScreen';
import TabNavigator from './TabNavigator';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CardScreen from '../screens/CardScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
        <Stack.Screen name='TabNavigator' component={TabNavigator} />
        <Stack.Screen name='ProductDetailsScreen' component={ProductDetailsScreen} />
        <Stack.Screen name='CardScreen' component={CardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator