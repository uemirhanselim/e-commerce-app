import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>WelcomeScreen</Text>
      <Button title='Go To Home' onPress={() => navigation.navigate("TabNavigator")} />
    </SafeAreaView>
  )
}

export default WelcomeScreen