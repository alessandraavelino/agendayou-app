import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'

export default function BusinessListItemSmall({ business }) {

  const navigation = useNavigation()


  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.push('business-detail', {
      business: business
    })}>
      <Image source={{uri: business?.images?.url}} 
        style={styles.image}
      
      />
      <View style={styles.infoContainer}>
        <Text style={{fontSize: 17}}>{business?.name}</Text>
        <Text style={{fontSize: 13}}>{business?.contactPerson}</Text>
        
        <Text style={{fontSize: 10, padding: 3, color: Colors.PRIMARY, borderRadius: 3, alignSelf: 'flex-start', backgroundColor: Colors.PRIMARY_LIGHT, paddingHorizontal: 7}}>{business?.category.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10
        
    },

    infoContainer: {
      padding: 7,
      display: 'flex',
      gap: 3

    },
    image: {
        width: 160,
        height: 100,
        borderRadius: 10

    }
})