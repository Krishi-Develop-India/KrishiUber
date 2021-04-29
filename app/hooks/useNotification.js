import * as Notifications from "expo-notifications";
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});

Notifications.addNotificationResponseReceivedListener(response => {
    console.log("addNotificationResponseReceivedListener", response);
});


module.exports = () => {

    const showNotification = (title, body) => {
        Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                data: {
                    _displayInForeground: true,
                    
                },
            },
            trigger: null,
        });
    }

    return { showNotification };
};