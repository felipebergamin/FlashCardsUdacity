import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';

const DAILY_NOTIFICATION_KEY = 'FlashCards:daily_notify';

function createDailyNotification() {
  return {
    title: 'Hey, bora estudar! 🤓',
    body: 'Você ainda não estudou nenhum quiz hoje!',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
}

export async function clearLocalNotifications() {
  await AsyncStorage.removeItem(DAILY_NOTIFICATION_KEY);
  return await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function setLocalNotification() {
  const data = JSON.parse(await AsyncStorage.getItem(DAILY_NOTIFICATION_KEY));

  if (!data) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

     if (status === 'granted') {
       await Notifications.cancelAllScheduledNotificationsAsync();

       const tomorrow = new Date();
       tomorrow.setDate(tomorrow.getDate() + 1);
       tomorrow.setHours(19);
       tomorrow.setMinutes(30);

       await Notifications.scheduleLocalNotificationAsync(
         createDailyNotification(),
         {
           time: tomorrow,
           repeat: 'day',
         }
       );

       await AsyncStorage.setItem(DAILY_NOTIFICATION_KEY, JSON.stringify(true));
     }
  }
}
