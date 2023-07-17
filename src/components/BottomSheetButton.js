import { Pressable, Text, View } from "native-base"
import { StyleSheet } from "react-native"

const BottomSheetButton = ({ onPress, theme, label }) => {
    return (
        <Pressable onPress={onPress} style={{width: label === 'Filtrele' ? '63%' : '33%'}}>
            <View style={{
                height: 50, width: '100%', backgroundColor: label === 'Filtrele' ?
                    theme === "dark" ? 'rgb(130, 98, 196)' : 'rgb(47, 133, 167)' :
                    'white',
                borderRadius: 10,
            borderColor: 'black', borderWidth: label === 'Filtrele' ? 0 : 1, alignItems: 'center', justifyContent: 'center'
          }}>
                <Text style={[styles.title, {
                    color: label === 'Filtrele' ?
                        'white':
                        'black'
                        , fontSize: 16
                }]}>
                {label}
            </Text>
          </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 13,
        marginBottom: 2,
        fontFamily: 'Montserrat_700Bold'
      },
})

export default BottomSheetButton