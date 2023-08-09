import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TabNavigator from './TabNavigator';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CardScreen from '../screens/CardScreen';
import WelcomeScreen from '../screens/onboard/WelcomeScreen';
import AddProduct from '../screens/AddProduct';
import CameraScreen from '../screens/CameraScreen';
import Theme from '../screens/order/Theme';
import LoginScreen from '../screens/order/LoginScreen'
import HomeScreenT from '../screens/order/HomeScreen'
import TimelineV2 from '../screens/order/TimelineV2'
import SwipeScreen from '../screens/order/SwipeScreen'

const Stack = createNativeStackNavigator();

const StackNavigator = ({ linking }) => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName='LoginScreen'
        screenOptions={{
          headerShown: false
        }}

      >
        <Stack.Screen name='HomeScreenT' component={HomeScreenT} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='Theme' component={Theme} />
        <Stack.Screen name='TimelineV2' component={TimelineV2} />
        <Stack.Screen name='SwipeScreen' component={SwipeScreen} />
        {/* <Stack.Screen name='Welcome' component={WelcomeScreen} />
        <Stack.Screen name='TabNavigator' component={TabNavigator} />
        <Stack.Screen name='ProductDetailsScreen' component={ProductDetailsScreen} />
        <Stack.Screen name='CardScreen' component={CardScreen} />
        <Stack.Screen name='AddProduct' component={AddProduct} />
        <Stack.Screen name='CameraScreen' component={CameraScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator