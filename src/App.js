// // In App.js in a new project

import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticationPage from './screens/AuthScreen';
//recoil 
import { RecoilRoot } from 'recoil';

import Login from './components/Login';
import Signup from './components/Signup';
import "../global.css";
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';
import Chatbot from './screens/Chatbot';
import PostDetailsScreen from './screens/PostDetailScreen';
import SuggestedUsers from './screens/SuggestedUsers';

const Stack = createNativeStackNavigator();



function RootStack({ initialRouteName }) {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Chatbot" component={Chatbot}
        options={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerTitle: 'PexelAi',
        }} />
      <Stack.Screen name="SuggestedUsers" component={SuggestedUsers}  options={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white'
        }} />

      <Stack.Screen name="PostDetailsScreen" component={PostDetailsScreen}


        options={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white'
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null); // Initial route state

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        // Retrieve user data from AsyncStorage
        const userData = await AsyncStorage.getItem('user-data');
        if (userData) {
          setInitialRoute('Home');
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.error('Error reading user data from AsyncStorage:', error);
        setInitialRoute('Login'); // Default to Login if error occurs
      }
    };

    checkUserLoggedIn();
  }, []);

  // Wait until we determine the initial route
  if (!initialRoute) {
    return null; // Render nothing or a splash screen while checking
  }
  return (
    <NavigationContainer>
      <RecoilRoot>
        <RootStack initialRouteName={initialRoute} />
      </RecoilRoot>
    </NavigationContainer>
  );
}

