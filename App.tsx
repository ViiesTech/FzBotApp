/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/Routes';
import { Platform, StatusBar, PermissionsAndroid } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import { setupNotificationListeners } from './src/assets/Utils/NotificationService';
import messaging from '@react-native-firebase/messaging';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const App = () => {

  const requestAndroidPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    }
  };
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'ios') {
        await messaging().requestPermission();
      } else if (Platform.OS === 'android') {
        await requestAndroidPermission();
      }
      setupNotificationListeners();
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    // hide nav bar when app loads
    SystemNavigationBar.stickyImmersive();
  }, []);
  return (

    <>
      <Provider store={store}>
        <StatusBar barStyle={'dark-content'} />
        <NavigationContainer>
          <Routes />
          <Toast />
        </NavigationContainer>
      </Provider>

    </>
  );
};

export default App;
