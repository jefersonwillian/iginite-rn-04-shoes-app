import { useEffect, useState } from 'react';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { Notification } from '../components/Notification';

import * as Linking from 'expo-linking';

const linking = {
  prefixes: ['igniteshoesapp://', 'com.jeferson.igniteshoes://'],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
}


export function Routes() {
  const [notification, setNotification] = useState<OSNotification>();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  const deeoLinking = Linking.createURL('details', {
    queryParams: {
      productId: '7'
  }})
  console.log("🚀 ~ file: index.tsx:37 ~ Routes ~ deeoLinking:", deeoLinking)

  useEffect(() => {
    const unsubscribe = OneSignal
      .setNotificationWillShowInForegroundHandler((notificationRecivedEvent: NotificationReceivedEvent) => {
        const response = notificationRecivedEvent.getNotification();

        setNotification(response);
      })

    return () => unsubscribe;

  }, [])

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />

      {
        notification?.title &&
        <Notification
          data={notification}
          onClose={() => setNotification(undefined)}
        />
      }
    </NavigationContainer>
  );
}