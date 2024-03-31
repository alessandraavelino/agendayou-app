import { Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import { FontAwesome5, Feather} from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigations() {
  return (

    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY
    }}>
        <Tab.Screen name='HomeScreen' component={HomeNavigation} options={{
            tabBarLabel:({color}) =>(
            <Text style={{color: color, fontSize: 12, marginTop: -7}}>Início</Text>
            ),
            tabBarIcon: ({color, size}) =>(
                <FontAwesome5 name="home" size={24} color={color} />
            )
        }}/>
        <Tab.Screen name='booking' component={BookingScreen} options={{
            tabBarLabel:({color}) =>(
            <Text style={{color: color, fontSize: 12, marginTop: -7}}>Agendamentos</Text>
            ),
            tabBarIcon: ({color, size}) =>(
                <FontAwesome5 name="calendar-alt" size={24} color={color} />
            )
        }}/>
        <Tab.Screen name='profile' component={ProfileScreen} options={{
            tabBarLabel:({color}) =>(
            <Text style={{color: color, fontSize: 12, marginTop: -7}}>Perfil</Text>
            ),
            tabBarIcon: ({color, size}) =>(
                <Feather name="user" size={24} color={color} />
            )
        }}/>
    </Tab.Navigator>
  )
}