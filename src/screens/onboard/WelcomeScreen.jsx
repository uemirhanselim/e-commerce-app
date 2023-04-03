
import React from 'react'
import LottieView from 'lottie-react-native'
import { View, Text } from 'native-base'
import CustomButton from '../../components/CustomButton'
import Colors from '../../constants/Colors'

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} px={5}>
      <LottieView source={require("../../../assets/lottie/onboard.json")} style={{ width: '80%' }} autoPlay loops duration={6000} />
      <Text bold fontSize={18} pb={60}>Welcome To E-Commerce-App</Text>
      <CustomButton onPress={() => navigation.navigate('TabNavigator')} mt={90} bg={Colors.orange}>
        Start Shopping
      </CustomButton>
    </View>
  )
}

export default WelcomeScreen