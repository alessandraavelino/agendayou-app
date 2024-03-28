import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

import BusinessPhotos from './BusinessPhotos';
import BusinessAboutMe from './BusinessAboutMe';
import BookingModal from './BookingModal';


export default function BusinessDetailsScreen() {

  const param = useRoute().params;
  const [business, setBusiness] = useState(param.business)
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation();
  

  useEffect(() => {
  }, [])

  return (
    <View>
    <ScrollView style={{height: '90%'}}>
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
        <BusinessAboutMe business={business}/>
        <View style={{borderWidth: 0.4, borderColor: Colors.GRAY, marginTop: 20, marginBottom: 20}}>
          
        </View>
        <BusinessPhotos business={business} />
      </View>
      
    </ScrollView>
    <View style={{display: 'flex', flexDirection: 'row', margin: 7, gap: 8}}>
      <TouchableOpacity style={styles.messageBtn}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: Colors.PRIMARY}}>Mensagem</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bookingBtn} onPress={() => setShowModal(true)}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: Colors.WHITE}}>Agendar horário</Text>
      </TouchableOpacity>
    </View>
    <Modal animationType='slide' visible={showModal}>
      <BookingModal businessId={business.id} hideModal={() => setShowModal(false)} />
      

    </Modal>
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
  },
  messageBtn: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1
  },
  bookingBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1

  }
})