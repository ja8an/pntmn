const functions = require('firebase-functions');
const { Expo } = require('expo-server-sdk');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}

exports.handleNotifications = functions.database.ref('/questions/{pushId}')
    .onCreate((snapshot, context) => {

        // firebase.database.ref('/users').child();

        const question = snapshot.val();
        const questionKey = snapshot.key;
        const pushId = context.params.pushId;

        const appOptions = JSON.parse(process.env.FIREBASE_CONFIG);
        appOptions.databaseAuthVariableOverride = context.auth;
        const app = admin.initializeApp(appOptions, 'app');

        console.log(Expo);

        // Create a new Expo SDK client
        let expo = new Expo();
        let messages = [];

        app.database().ref().child('users').once('value', (users) => {
            users
                .filter(user => {
                    if (!(question.lat && question.lng && user.lat && user.lnt))
                        return false;
                    return distance(question.lat, question.lng, user.lat, user.lng) <= 2;
                })
                .sort(() => 0.5 - Math.random())
                .slice(0, 5)
                .forEach(user => {
                    const pushToken = user.pushToken;
                    if (!Expo.isExpoPushToken(pushToken)) {
                        console.error(`Push token ${pushToken} is not a valid Expo push token`);
                        return;
                    }
                    messages.push({
                        to: pushToken,
                        sound: 'default',
                        body: user.question,
                        data: { qId: pushId },
                    })
                });
        });

        let chunks = expo.chunkPushNotifications(messages);
        let tickets = [];
        (async () => {
            // Send the chunks to the Expo push notification service. There are
            // different strategies you could use. A simple one is to send one chunk at a
            // time, which nicely spreads the load out over time:
            for (let chunk of chunks) {
                try {
                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    console.log(ticketChunk);
                    tickets.push(...ticketChunk);
                    // NOTE: If a ticket contains an error code in ticket.details.error, you
                    // must handle it appropriately. The error codes are listed in the Expo
                    // documentation:
                    // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
                } catch (error) {
                    console.error(error);
                }
            }
        })();

    });