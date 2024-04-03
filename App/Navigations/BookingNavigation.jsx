import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BusinessDetailsScreen from '../Screens/BusinessDetailsScreen/BusinessDetailsScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';

const Stack = createStackNavigator();

export default function BookingNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="bookings" component={BookingScreen} />
        <Stack.Screen name="business-detail" component={BusinessDetailsScreen} />
    </Stack.Navigator>
  )
}