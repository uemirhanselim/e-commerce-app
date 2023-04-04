import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import StackNavigator from './src/navigator/StackNavigator';
import store from './src/redux/store';
import linking from './src/product/Linking';
import { useEffect } from 'react';
import * as Location from 'expo-location';
import { StoreData } from './src/storage/ProfileStorage';

export default function App() {

  useEffect(() => {
    locat()
  }, [])

  const locat = async () => {
    console.log(`gidrdii`)
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let lctn = await Location.getCurrentPositionAsync({});
    let regionName = await Location.reverseGeocodeAsync({
      latitude: lctn['coords']['latitude'],
      longitude: lctn['coords']['longitude'],
    });
    let regName = JSON.stringify(regionName[0]["region"])
    await StoreData("region", regName)
    await StoreData("latitude", lctn['coords']['latitude'].toString())
    await StoreData("longitude", lctn['coords']['longitude'].toString())
    console.log(`ggghfghfghhfg name: `, lctn)
    console.log(` name: `, regName)
  }




  return (
    <Provider store={store}>

      <NativeBaseProvider>

        <StackNavigator linking={linking}></StackNavigator>
      </NativeBaseProvider>
    </Provider>
  );
}


