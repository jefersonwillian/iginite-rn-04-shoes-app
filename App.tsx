import { Platform, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';

import OneSignal, { NotificationReceivedEvent } from 'react-native-onesignal';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';
import { useEffect } from 'react';


const oneSignalAppId = Platform.OS === 'ios' ? '' : '7486666a-de69-47a2-a23b-f13b44d8e0f4';
OneSignal.setAppId(oneSignalAppId);

// OneSignal.promptForPushNotificationsWithUserResponse(response => {
//   console.log(response);
// })

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal
      .setNotificationWillShowInForegroundHandler((notificationRecivedEvent: NotificationReceivedEvent) => {
        console.log(notificationRecivedEvent);
      })

    return () => unsubscribe;

  }, [])

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