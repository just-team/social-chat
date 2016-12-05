import OneSignal from 'react-native-onesignal'; // Import package from node modules

const Config = {};
OneSignal.configure({
    onIdsAvailable: function(device) {
        Config.userId = device.userId;
        console.log('PushToken = ', device.pushToken);
    },
  onNotificationOpened: function(message, data, isActive) {
      console.log('MESSAGE: ', message);
      console.log('DATA: ', data);
      console.log('ISACTIVE: ', isActive);
  }
});

export default Config