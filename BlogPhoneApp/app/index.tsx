import React from 'react';
import * as DeepLinking from "expo-linking"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './components/HomeStack';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from "react"
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/commonjs/src/types';
import { NavigationContainer } from '@react-navigation/native';
import AccountStack from './components/AccountStack';
import { HomeStackParamList } from './components/Card';

const Tab = createBottomTabNavigator();

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Account: 'login',  
      FullPost: 'fullPost/:postId', 
    },
  },
};

export default function App() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  
  useEffect(() => {
    //@ts-ignore
    const handleDeepLink = (event) => {
      const url = event.url;
      console.log('Received deep link:', url);

      const { queryParams } = DeepLinking.parse(url);
      console.log('Query Parameters:', queryParams);

      if (queryParams?.user) {
        // Ensure `queryParams.user` is a string
        const userString = Array.isArray(queryParams.user)
          ? queryParams.user[0] // Take the first element if it's an array
          : queryParams.user;

        try {
          // Parse the user data from the query string
          const user = JSON.parse(userString);
          console.log('Navigating with user:', user);

          // Ensure the user is passed to the Account screen as expected
          navigation.navigate('Account', { user });
        } catch (error) {
          console.error('Error parsing user:', error);
        }
      }
    };

    DeepLinking.addEventListener('url', handleDeepLink);
  }, [navigation]);

  return (
    <NavigationContainer linking={linking}>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: React.ComponentProps<typeof Ionicons>['name'];

            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons key={iconName} name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: '#276cdb',
            height: 60,
          },
          headerShown: false,
          animation: "shift",
        })}>
        <Tab.Screen name="HomeTab" component={HomeStack} />
        <Tab.Screen name="Account" component={AccountStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}