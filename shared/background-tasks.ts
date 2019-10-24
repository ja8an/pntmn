import * as TaskManager from 'expo-task-manager';
import { Geolocation } from './geolocation';
import { firebaseRef, firebaseAuth } from './firebase';
import * as Location from 'expo-location';
import { BackgroundFetch } from 'expo';

const LOCATION_TASK_NAME = 'background-location-task';


class BackgroundServices {

    enabled: boolean;

    constructor() {

    }

    async initialize() {
        if (this.enabled)
            Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                accuracy: Location.Accuracy.Highest,
                timeInterval: 1000 * 60 * 15
            });
    }

    async handle(task) {

        if (this.enabled)

            if (!firebaseAuth.currentUser)
                return;

        const loc = await Geolocation._getLocationAsync();

        const upd = {
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
            lastUpdate: loc.timestamp
        };

        firebaseRef.child('users').orderByChild('uid').equalTo(firebaseAuth.currentUser.uid)
            .once('value').then((user) => {
                firebaseRef.child('users/' + user.key).set(upd);
            });
    }

}

export const Services = new BackgroundServices();