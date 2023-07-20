import { View } from "native-base"
import { useState } from "react"
import { StyleSheet } from "react-native"
import { TextInput } from "react-native-paper"

const LoginEmailField = ({}) => {
    const [text, setText] = useState("")
    return (
        <TextInput
            style={style.container}
            label="Email"
            value={text}
            onChangeText={text => setText(text)}
            underlineStyle={{
                backgroundColor: 'transparent',
            }}
        />
    )
}

const LoginPassField = ({}) => {
    const [text, setText] = useState("")
    const [visible, setVisible] = useState(false)
    return (
        <TextInput
            style={style.container}
            label="Şifre"
            value={text}
            secureTextEntry={visible}
            onChangeText={text => setText(text)}
            right={visible ? <TextInput.Icon icon="eye-off"/> : <TextInput.Icon icon="eye"/>}
            underlineStyle={{
                backgroundColor: 'transparent',
            }}
        />
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(245,245,245)',
        height: 60,
        borderRadius: 10,
    }
})

export {LoginEmailField, LoginPassField}