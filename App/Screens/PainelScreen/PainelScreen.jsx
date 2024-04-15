import { View, Text } from 'react-native'
import React from 'react'
import PageHeading from '../../Components/PageHeading'
import Heading from '../../Components/Heading'

export default function PainelScreen() {
  return (
    <View style={{padding: 20}}>
      <PageHeading title="Painel"/>
      <View style={{padding: 20}}>
      <Heading text="Atualizar horários"/>

      </View>


    </View>
  )
}