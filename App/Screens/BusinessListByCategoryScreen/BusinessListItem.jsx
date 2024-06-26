import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
export default function BusinessListItem({business, booking}) {

  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.push('business-details', 
    {
      business: business
    })
    }>
      <Image source={{uri:business?.images?.url}}
        style={styles.image}
      />

      <View style={styles.subContainer}>
        <Text style={{fontSize: 15, color: Colors.GRAY}}>{business?.name}</Text>
        <Text style={{fontSize: 19, fontWeight: 'bold'}}>{business?.serviceType}</Text>
        {!booking?.id ? <Text style={{fontSize: 16, color: Colors.GRAY}}>
            <Ionicons name="location-sharp" size={20} color={Colors.PRIMARY} />
        {business.address}</Text> :

        <Text style={{backgroundColor: Colors.PRIMARY_LIGHT, fontSize: 10, padding: 3, color: Colors.PRIMARY, borderRadius: 3, alignSelf: 'flex-start'}}>{booking?.bookingStatus}</Text>}
        {booking?.id ? <Text style={{fontSize: 15, padding: 3, color: Colors.PRIMARY, alignSelf: 'flex-start'}}><AntDesign name="calendar" size={24} color={Colors.PRIMARY} style={{marginRight: 15}}/> {booking?.date} às {booking?.time}</Text> : null}
    
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