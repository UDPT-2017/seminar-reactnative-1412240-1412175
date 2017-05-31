
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

import {TabNavigator} from 'react-navigation';

import styles from '../styles/styles';
import MyHomeScreen from './homeStack';
import MyNotificationsScreen from './whatever'

export default MyApp = TabNavigator({
  Home: {
    screen: MyHomeScreen,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Home',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
          <Image
          source={require('../images/home.png')}
          style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      }),
  },
  Notifications: {
    screen: MyNotificationsScreen,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: 'User',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      tabBarIcon: ({ tintColor }) => (
        <Image
        source={require('../images/user.png')}
        style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    }),
  },
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon:  true,
    activeTintColor: '#e91e63',
    style: {
      height: 56,
      backgroundColor: '#ff99cc',
    },
  },
});
