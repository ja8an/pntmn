import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';

class GeolocationService {

    ready: boolean;

    constructor() {
        if (Platform.OS === 'android' && !Constants.isDevice) {

        } else {
            this.ready = true;
            this._getLocationAsync();
        }
    }

    private async checkGranted() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            return;
        }
    }

    _getLocationAsync = async () => {
        if (!this.checkGranted())
            return;
        return await Location.getCurrentPositionAsync({
            enableHighAccuracy: true
        });
    };

    async watchPosition(fn) {
        if (!this.checkGranted())
            return;
        return Location.watchPositionAsync({
            enableHighAccuracy: true,
            accuracy: Location.Accuracy.Highest,
            // timeInterval: 1000
        }, fn);
    }

}

export const Geolocation = new GeolocationService();