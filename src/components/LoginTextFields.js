import { View } from "native-base"
import { useState } from "react"
import { StyleSheet } from "react-native"
import { TextInput } from "react-native-paper"

const LoginEmailField = ({ email, setEmail }) => {
    return (
        <TextInput
            style={style.container}
            label="Email"
            value={email}
            onChangeText={email => setEmail(email)}
            underlineStyle={{
                backgroundColor: 'transparent',
            }}
        />
    )
}

const LoginPassField = ({ password, setPassword }) => {
    const [visible, setVisible] = useState(false)
    return (
        <TextInput
            style={style.container}
            label="Şifre"
            value={password}
            secureTextEntry={visible}
            onChangeText={password => setPassword(password)}
            right={visible ? showPassword("eye-off")
                : showPassword("eye")
            }
            underlineStyle={{
                backgroundColor: 'transparent',
            }}
        />
    )



    function showPassword(iconName) {
        return <TextInput.Icon icon={iconName} onPress={() => setVisible(!visible)} />
    }
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(245,245,245)',
        height: 60,
        borderRadius: 10,
    }
})

export { LoginEmailField, LoginPassField }