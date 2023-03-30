import AsyncStorage from '@react-native-async-storage/async-storage';

const StoreData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(`In storeData occured an error: ${error}`);
    }
}

const GetData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log(`In getData occured an error: ${error}`);
    }
}

export { GetData, StoreData }