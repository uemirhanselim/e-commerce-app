import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import LoginButton from '../../components/LoginButton'
import { LoginEmailField, LoginPassField } from '../../components/LoginTextFields'
import { Box } from 'native-base'
import SignIn from '../../service/AuthService'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState("")  
    const [password, setPassword] = useState("")

    const _onPress = async () => {
        const response = await SignIn({ email: email, password: password })
        if (response.status === 200) {
            navigation.navigate("HomeScreenT", response)
        } else if (response.status === 401) {
            
        }
    }

    return (
        <View style={style.container}>
            <LoginEmailField email={email} setEmail={setEmail} />
            <Box height={4} />
            <LoginPassField password={password} setPassword={setPassword}/>
            <Box height={30} />
            <LoginButton onPress={_onPress} isActive={email !== "" && password !== ""}/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20
    }
})

export default LoginScreen