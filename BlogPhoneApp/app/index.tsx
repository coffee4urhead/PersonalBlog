import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from './components/Account';
import Home from './components/Home';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'lora-bold-italic': require('../assets/fonts/Lora/static/Lora-BoldItalic.ttf'),
    'lora-bold': require('../assets/fonts/Lora/static/Lora-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00416A" />
      </View>
    );
  }

  return (
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: React.ComponentProps<typeof Ionicons>['name'];

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons key={iconName} name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerTitleAlign: "center",
          tabBarStyle: {
            backgroundColor: '#C4E560',
            height: 60,
          },
          headerStyle: {
            backgroundColor: '#C4E560',
            height: 60,
          },
          animation: "shift",
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
  );
}

let styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})