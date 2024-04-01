import { View } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import React from 'react'
import Header from './Header'
import Slider from './Slider'
import Categories from './Categories'
import BusinessList from './BusinessList'

export default function HomeScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
      {/* <Header /> */}
      <View style={{padding: 20}}>
      <Slider />
      <Categories />
      <BusinessList />
      </View>
      
    </ScrollView>
  )
}