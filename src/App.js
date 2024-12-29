// In App.js in a new project

import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import Login from './components/Login';
import Signup from './components/Signup';
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';
import Chatbot from './screens/Chatbot';
import PostDetailsScreen from './screens/PostDetailScreen';
import SuggestedUsers from './screens/SuggestedUsers';
import OnboardingScreen1 from './screens/OnboardingScreen1';
import OnboardingScreen2 from './screens/OnboardingScreen2';
import OnboardingScreen3 from './screens/OnboardingScreen3';

const Stack = createNativeStackNavigator();

function RootStack({ initialRouteName }) {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1} options={{ headerShown: false }} />
      <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} options={{ headerShown: false }} />
      <Stack.Screen name="OnboardingScreen3" component={OnboardingScreen3} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen 
        name="Chatbot" 
        component={Chatbot} 
        options={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerTitle: 'PexelAi',
        }} 
      />
      <Stack.Screen 
        name="SuggestedUsers" 
        component={SuggestedUsers} 
        options={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
        }} 
      />
      <Stack.Screen 
        name="PostDetailsScreen" 
        component={PostDetailsScreen} 
        options={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
        }} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkAppUsage = async () => {
      try {
        // Check if onboarding is already completed
        const onboardingCompleted = await AsyncStorage.getItem('onboarding-completed');
        if (!onboardingCompleted) {
          setInitialRoute('OnboardingScreen1');
        } else {
          // Retrieve user data from AsyncStorage
          const userData = await AsyncStorage.getItem('user-data');
          if (userData) {
            setInitialRoute('Home');
          } else {
            setInitialRoute('Login');
          }
        }
      } catch (error) {
        console.error('Error during onboarding/user check:', error);
        setInitialRoute('Login'); // Default to Login on error
      }
    };

    checkAppUsage();
  }, []);

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
