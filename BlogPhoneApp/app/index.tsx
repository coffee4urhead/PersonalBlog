import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './components/HomeStack';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/commonjs/src/types';
import { NavigationContainer } from '@react-navigation/native';
import AccountStack from './components/AccountStack';
import { HomeStackParamList } from './components/Card';
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

const Tab = createBottomTabNavigator();

export default function App() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const linking = {
    prefixes: [prefix, 'myapp://'],
    config: {
      screens: {
        Home: 'home',
        Register: 'register',
      },
    },
  };

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