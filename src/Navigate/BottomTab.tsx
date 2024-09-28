import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Admin from '../Screens/Pages/Admin';
import UserDataProfile from '../Screens/Pages/UserDataProfile';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <>
      <Tab.Navigator>
        {/* Admin Tab */}
        <Tab.Screen
          name="Admin"
          component={Admin}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require('../assets/home_two.png') 
                    : require('../assets/home_one.png')
                }
                style={{ width: 25, height: 25 }}
              />
            ),
          }}
        />

        {/* User Data Profile Tab */}
        <Tab.Screen
          name="UserDataProfile"
          component={UserDataProfile}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require('../assets/usertwo.png') 
                    : require('../assets/userone.png') 
                }
                style={{ width: 25, height: 25 }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
