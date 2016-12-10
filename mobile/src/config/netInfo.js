import { NetInfo } from 'react-native';

handleFirstConnectivityChange();
function handleFirstConnectivityChange(isConnected) {
  NetInfo.isConnected.fetch().then(isConnected => {
    console.log('First, is ' + (isConnected ? 'online' : 'offline'));
  });
}
NetInfo.isConnected.addEventListener(
  'change',
  handleFirstConnectivityChange
);
