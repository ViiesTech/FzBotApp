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
import ErrorBoundary from './src/components/ErrorBoundary';

const App = () => {

  const requestAndroidPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission granted
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

    // Listen for FCM token refreshes and update the server
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(async (newToken) => {
      // We can't access redux store here directly, so we store it
      // The token will be sent to server on next login
      // For active sessions, we try to update via the store
      try {
        const state = store.getState();
        const userId = state?.user?.userData?._id;
        if (userId) {
          const axios = require('axios').default;
          const { BaseUrl } = require('./src/assets/BaseUrl');
          await axios.post(`${BaseUrl}user/updateUser`, {
            userId,
            FCMToken: newToken,
          });
        }
      } catch (error) {
        // Silently fail
      }
    });

    return () => {
      unsubscribeTokenRefresh();
    };
  }, []);

  useEffect(() => {
    // hide nav bar when app loads
    SystemNavigationBar.stickyImmersive();
  }, []);
  return (

    <>
      <ErrorBoundary>
        <Provider store={store}>
          <StatusBar barStyle={'dark-content'} />
          <NavigationContainer>
            <Routes />
            <Toast />
          </NavigationContainer>
        </Provider>
      </ErrorBoundary>
    </>
  );
};

export default App;
