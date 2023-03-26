import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import StackNavigator from './src/navigator/StackNavigator';
import store from './src/redux/store';

export default function App() {


  return (
    <Provider store={store}>

      <NativeBaseProvider>
        <StackNavigator></StackNavigator>
      </NativeBaseProvider>
    </Provider>
  );
}


