import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { navigationRef } from './NavigationRef';

// 🔹 Setup notification channel
async function createDefaultChannel() {
  await notifee.createChannel({
    id: 'FZBot1234',
    name: 'FZBot',
    importance: AndroidImportance.HIGH,
  });
}

// 🔹 Ask for permission
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // Permission granted
  }
}

// 🔹 Main setup
export function setupNotificationListeners() {
  createDefaultChannel();
  requestUserPermission();

  // Handle notifee notification tap (foreground-displayed notifications)
  notifee.onForegroundEvent(({ type }) => {
    if (type === EventType.PRESS) {
      navigationRef.current?.navigate('Main', { screen: 'Main', params: { screen: 'Changelog' } });
    }
  });

  // Foreground notifications
  return messaging().onMessage(async remoteMessage => {
    await notifee.displayNotification({
      title: remoteMessage?.notification?.title,
      body: remoteMessage?.notification?.body,
      android: {
        channelId: 'FZBot1234',
        smallIcon: 'ic_launcher',
        pressAction: { id: 'default' },
      },
    });
  });
}
