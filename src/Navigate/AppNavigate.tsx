import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import screens
import SplshScreens from '../Screens/InitailScreens/SplshScreens';
import LandingScreens from '../Screens/authentication/LandingScreens';
import SignUp from '../Screens/authentication/SignUp';
import Login from '../Screens/authentication/Login';
import UserProfile from '../Screens/Pages/UserProfile';
import Admin from '../Screens/Pages/Admin';
import BottomTab from './BottomTab';
const Stack = createNativeStackNavigator();

function AppNavigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplshScreens'>
        <Stack.Screen 
        name="SplshScreens"
         component={SplshScreens}
         options={{ headerShown: false }}
         />
         <Stack.Screen 
        name="LandingScreens"
         component={LandingScreens}
         options={{ headerShown: false }}
         />
         <Stack.Screen 
        name="SignUp"
         component={SignUp}
         options={{ headerShown: false }}
         />
         <Stack.Screen 
        name="Login"
         component={Login}
         options={{ headerShown: false }}
         />
          <Stack.Screen 
        name="UserProfile"
         component={UserProfile}
         options={{ headerShown: false }}
         />
          {/* <Stack.Screen 
        name="Admin"
         component={Admin}
         options={{ headerShown: false }}
         /> */}
          <Stack.Screen 
        name="BottomTab"
         component={BottomTab}
         options={{ headerShown: false }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigate;