import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Icon } from '@rneui/themed';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
        >
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarIcon: ({ size, color }) => (
                    <Icon name='home' type='entypo' />
                )
            }} />
            <Tab.Screen name='Profile' component={ProfileScreen} options={{
                 tabBarIcon: ({ size, color }) => (
                    <Icon name='man' type='entypo' />
                )
            }} />
        </Tab.Navigator>
    )
}


export default TabNavigator