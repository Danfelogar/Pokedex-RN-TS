import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

import {NavigationTab} from './src/navigation/navigationTab';
import {persistor, store} from './src/redux/store';
import {
  notificationCloudMessageListener,
  requestUserPermission,
} from './src/util/firebaseSupport';

function App(): JSX.Element {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission();
    notificationCloudMessageListener();
    // getTokenForCloudMessage();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <NavigationTab />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
