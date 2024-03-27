import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';

export default function BusinessDetailsScreen() {

  const param = useRoute().params;
  const [business, setBusiness] = useState(param.business)
  const navigation = useNavigation();
  const [isReadMore, setIsReadMore] = useState(false)

  useEffect(() => {
  }, [])

  return (
    <View>
      <TouchableOpacity style={styles.backBtnContainer} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back-outline" size={24} color="white" />
      </TouchableOpacity>
      <Image source={{uri:business.images?.url}}
      style={{width: '100%', height: 300}} 
      />

      <View style={styles.infoContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>{business?.contactPerson}</Text>
        <View style={styles.subContainer}>
        <Text style={{color: Colors.PRIMARY, fontSize: 20}}>{business?.name}</Text>
        <Text style={{color: Colors.PRIMARY, backgroundColor: Colors.PRIMARY_LIGHT, padding: 5, borderRadius: 5, fontSize: 14}}>{business?.category.name}</Text>
        </View>
        <Text style={{fontSize: 17, color: Colors.GRAY}}><Ionicons name="location-sharp" size={20} color={Colors.PRIMARY} /> {business?.address}</Text>
        
        <View style={{borderWidth: 0.4, borderColor: Colors.GRAY, marginTop: 20, marginBottom: 20}}></View>
        
        <View>
          <Heading text={"Sobre"} />
          <Text style={{color: Colors.GRAY, fontSize: 16, lineHeight: 28}} numberOfLines={isReadMore ? 20 : 5}>{business?.about}</Text>
          <TouchableOpacity onPress = {() => setIsReadMore(!isReadMore)
          }>
            <Text style={{color: Colors.PRIMARY, fontSize: 16}}>{isReadMore ? 'Ler menos' : 'Ler mais'}</Text>
          </TouchableOpacity>
        </View>
      
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  backBtnContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 20
  },
  infoContainer: {
    padding: 20,
    display: 'flex',
    gap: 7
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  }
})