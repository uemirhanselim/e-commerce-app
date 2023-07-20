import { View, Text } from "native-base"
import { Pressable, StyleSheet } from "react-native"

const LoginButton = ({onPress}) => {
    return (
        <Pressable onPress={onPress}>
            <View style={style.button}>
            <Text style={style.text}>
                Giriş Yap
            </Text>
        </View>
        </Pressable>
    )
}

const style = StyleSheet.create({
    button: {
        backgroundColor: 'rgb(110,0,239)',
        width: '100%',
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default LoginButton

