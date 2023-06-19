import { SafeAreaView, Text, StyleSheet, View, Switch } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StoreTheme, GetStoredTheme } from '../../storage/ThemeStorage'
import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'native-base'
import { useFonts, Montserrat_400Regular, Montserrat_700Bold, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'
import { useNavigation } from '@react-navigation/native'

const Theme = () => {
    const navigation = useNavigation()
    const [storedTheme, setStoredTheme] = useState("random")
    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_700Bold, Montserrat_600SemiBold
    });

    useEffect(() => {
        const getStoredTheme = async () => {
            const theme = await GetStoredTheme("theme")
            setStoredTheme(theme)
            if (theme === "light") {
                setIsEnabled(false)
            } else {
                setIsEnabled(true)
            }
        }

        getStoredTheme()
    }, [storedTheme])


    if (!fontsLoaded) {
        return null;
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', paddingRight: '35%' }}>
                <Pressable onPress={() => navigation.goBack()}>

                    <Ionicons name='arrow-back' size={28} />
                </Pressable>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'Montserrat_700Bold',
                }}>Options</Text>
            </View>
            <Tile isEnabled={isEnabled} toggleSwitch={toggleSwitch} />
        </SafeAreaView>
    )
}

const Tile = ({ isEnabled, toggleSwitch }) => {
    return (
        <View style={styles.tile}>
            <Text>Theme</Text>
            <Switch
                thumbColor={isEnabled ? 'rgb(130, 148, 196)' : 'rgb(219, 223, 234)'}
                onValueChange={async () => {
                    toggleSwitch()
                    if (isEnabled === false) {
                        await StoreTheme("dark")
                    } else if (isEnabled === true) {
                        await StoreTheme("light")
                    }
                }}
                value={isEnabled}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        top: '6%',
        width: '100%'
    },
    tile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        backgroundColor: 'rgba(160,163,162, 0.3)',
        width: '80%',
        borderRadius: 10,
        top: 30,
        padding: 10,
        alignItems: 'center',
    }
})

export default Theme