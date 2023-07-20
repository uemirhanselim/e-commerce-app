import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import LoginButton from '../../components/LoginButton'
import { LoginEmailField, LoginPassField } from '../../components/LoginTextFields'
import { Box } from 'native-base'
import SignIn from '../../service/AuthService'
import axios from 'axios'

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <View style={style.container}>
            <LoginEmailField />
            <Box height={4} />
            <LoginPassField />
            <Box height={30} />
            <LoginButton onPress={async () => {
                await SignIn({ email: "admin@demo", password: "demo" })
            }} />
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