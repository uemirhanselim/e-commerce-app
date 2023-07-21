import { View, Text } from "native-base"
import { Pressable, StyleSheet } from "react-native"

const LoginButton = ({onPress, isActive}) => {
    return (
        <Pressable onPress={isActive ? onPress : null}>
            <View style={[style.button, {
                opacity: isActive ? 1 : 0.3
            }]}>
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

