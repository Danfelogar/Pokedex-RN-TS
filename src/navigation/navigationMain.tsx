import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from '../screen/home';
import {Details} from '../screen/details';

const Stack = createStackNavigator<RootStackMainParams>();

export type RootStackMainParams = {
  Home: undefined;
  Details: undefined;
};

export const NavigationMain = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};
