import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TabNavigator from './TabNavigator';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CardScreen from '../screens/CardScreen';
import WelcomeScreen from '../screens/onboard/WelcomeScreen';
import AddProduct from '../screens/AddProduct';
import CameraScreen from '../screens/CameraScreen';

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
        <Stack.Screen name='AddProduct' component={AddProduct} />
        <Stack.Screen name='CameraScreen' component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator