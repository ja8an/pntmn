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

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            return;
        }

        return await Location.getCurrentPositionAsync({
            enableHighAccuracy: true
        });
    };

}

export const Geolocation = new GeolocationService();