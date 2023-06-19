import AsyncStorage from '@react-native-async-storage/async-storage';

const StoreTheme = async (value) => {
    try {
        await AsyncStorage.setItem("theme", value)
    } catch (error) {
        console.log(`In storeTheme occured an error: ${error}`);
    }
}

const GetStoredTheme = async () => {
    try {
        const value = await AsyncStorage.getItem("theme")
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log(`In getStoredTheme occured an error: ${error}`);
    }
}

export { StoreTheme, GetStoredTheme }