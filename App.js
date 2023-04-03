import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import StackNavigator from './src/navigator/StackNavigator';
import store from './src/redux/store';
import linking from './src/product/Linking';

export default function App() {


  return (
    <Provider store={store}>

      <NativeBaseProvider>

        <StackNavigator linking={linking}></StackNavigator>
      </NativeBaseProvider>
    </Provider>
  );
}


