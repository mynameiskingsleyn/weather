import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './app/screens/homeScreen';


const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="homeScreen">
         <Tab.Screen name="homeScreen" component={HomeScreen} />
       </Tab.Navigator>
    </NavigationContainer>
  )
}
export default App;
