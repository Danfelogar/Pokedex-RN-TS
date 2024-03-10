import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationMain} from './navigationMain';
import {FavoriteListPoke} from '../screen/favoriteListPoke';
import {NativeModules, Platform, useColorScheme} from 'react-native';
import {RootState} from '../redux/store';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const {RNSharedWidget} = NativeModules;

export const NavigationTab = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const {favoritesPokeList} = useSelector(
    (state: RootState) => state.pokeReducer,
  );

  useEffect(() => {
    RNSharedWidget.setData(
      'pokeFavoriteList',
      JSON.stringify(favoritesPokeList),
      (status: number | null) => console.log({status}),
    );
  }, [favoritesPokeList]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDarkMode ? Colors.blue : Colors.red,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: isDarkMode
            ? 'rgba(255, 255, 255, 1)'
            : Colors.darker,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: Platform.OS === 'android' ? 60 : 90,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          marginBottom: 10,
        },
        tabBarShowLabel: true,
      }}
      initialRouteName="NavigationMain">
      <Tab.Screen
        name="NavigationMain"
        component={NavigationMain}
        options={{
          tabBarLabel: 'Pokes',
          tabBarIcon: ({color, focused}) => (
            <>
              {focused ? (
                <Ionicons name="list-circle" size={23} color={color} />
              ) : (
                <Ionicons
                  name="list-circle-outline"
                  size={23}
                  color={'#6390F0'}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="FavoriteListPoke"
        component={FavoriteListPoke}
        options={{
          tabBarLabel: 'Favorites Pokes',
          tabBarIcon: ({color, focused}) => (
            <>
              {focused ? (
                <Ionicons name="clipboard" size={23} color={color} />
              ) : (
                <Ionicons
                  name="clipboard-outline"
                  size={23}
                  color={'#6390F0'}
                />
              )}
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
