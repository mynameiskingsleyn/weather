import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './app/screens/homeScreen';
import SearchScreen from './app/screens/searchScreen';

const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="homeScreen">
         <Tab.Screen name="Home" component={HomeScreen} />
         <Tab.Screen name="Search" component={SearchScreen} />
       </Tab.Navigator>
    </NavigationContainer>
  )
}
export default App;
