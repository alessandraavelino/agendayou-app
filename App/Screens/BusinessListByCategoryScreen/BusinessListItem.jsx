import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BusinessListItem({business}) {

  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.push('business-detail', 
    {
      business: business
    })
    }>
      <Image source={{uri:business?.images?.url}}
        style={styles.image}
      />

      <View style={styles.subContainer}>
        <Text style={{fontSize: 15, color: Colors.GRAY}}>{business.name}</Text>
        <Text style={{fontSize: 19, fontWeight: 'bold'}}>{business.contactPerson}</Text>
        <Text style={{fontSize: 16, color: Colors.GRAY}}>
            <Ionicons name="location-sharp" size={20} color={Colors.PRIMARY} />
        {business.address}</Text>
      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10


    },

    subContainer: {
        display: 'flex',
        gap: 8


    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 9
    }
})