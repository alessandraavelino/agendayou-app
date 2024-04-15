import { Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import { FontAwesome5, Feather, FontAwesome } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import HomeNavigation from './HomeNavigation';
import BookingNavigation from './BookingNavigation';
import PainelScreen from '../Screens/PainelScreen/PainelScreen';

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
        <Tab.Screen name='booking' component={BookingNavigation} options={{
            tabBarLabel:({color}) =>(
            <Text style={{color: color, fontSize: 12, marginTop: -7}}>Agenda</Text>
            ),
            tabBarIcon: ({color, size}) =>(
                <FontAwesome5 name="calendar-alt" size={24} color={color} />
            )
        }}/>
        <Tab.Screen name='painel' component={PainelScreen} options={{
            tabBarLabel:({color}) =>(
            <Text style={{color: color, fontSize: 12, marginTop: -7}}>Painel</Text>
            ),
            tabBarIcon: ({color, size}) =>(
                <FontAwesome5 name="edit" size={24} color={color} />
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