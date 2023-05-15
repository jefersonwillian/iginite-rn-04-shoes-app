import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { Platform, StatusBar } from 'react-native';

import { Routes } from './src/routes';

import { Loading } from './src/components/Loading';
import { THEME } from './src/theme';

import { CartContextProvider } from './src/contexts/CartContext';

import OneSignal from 'react-native-onesignal';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';

const oneSignalAppId = Platform.OS === 'ios' ? '' : '7486666a-de69-47a2-a23b-f13b44d8e0f4';
OneSignal.setAppId(oneSignalAppId);

// OneSignal.promptForPushNotificationsWithUserResponse(response => {
//   console.log(response);
// })

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  
  tagUserInfoCreate();

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}