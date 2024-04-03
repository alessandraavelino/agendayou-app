import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import RegisterServiceScreen from '../Screens/RegisterSeviceScreen/RegisterServiceScreen';

const Stack = createStackNavigator();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="RegisterServiceScreen" component={RegisterServiceScreen} />
    </Stack.Navigator>
  )
}