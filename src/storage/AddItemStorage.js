import AsyncStorage from '@react-native-async-storage/async-storage';

const storeProduct = async (key, product) => {
    try {
        const jsonValue = JSON.stringify(product)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (error) {
        console.log(`In storeProduct occured an error: ${error}`);
    }
}

const getStoredProduct = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.log(`In storeProduct occured an error: ${error}`);
    }
}

export { storeProduct, getStoredProduct }