import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

class NotificationsService {

    _notificationSubscription;

    async registerForPushNotificationsAsync() {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }

        console.log(await this.getToken());
    }

    async getToken() {
        return await Notifications.getExpoPushTokenAsync();
    }

    async startListening() {
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification(params) {
        console.log('params', params);
    }

}

const Notifier = new NotificationsService();
export default Notifier;