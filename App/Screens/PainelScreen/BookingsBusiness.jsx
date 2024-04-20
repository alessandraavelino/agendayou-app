import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function BookingsBusiness() {

  const [bookingsClient, setBookingsClient] = useState([])
  const {user} = useUser()
  const email = user?.primaryEmailAddress

  useEffect(() => {
    getBusinessBookings()
    

  }, [])

  const getBusinessBookings = () => {
    GlobalApi.getListBookingsByBusiness(email).then(resp => {
      console.log("bookings: ", resp.bookings)
      setBookingsClient(resp.bookings)
    })
  }
  const createAsset = () => {
    GlobalApi.createAsset().then(resp => {
      console.log("aset: ", resp)
    })
  }

  return (
    <View>
      {bookingsClient.length > 0 ? <FlatList 
      horizontal={false}
      data={bookingsClient}
      renderItem={({item, index}) => (
        <View style={styles.container}>

          <Text style={{fontSize: 17}}>{item.userName}</Text>
          <Text style={{fontSize: 13}}>{item.note}</Text>
          <Text style={{fontSize: 15, padding: 3, color: Colors.PRIMARY, alignSelf: 'flex-start'}}><AntDesign name="calendar" size={24} color={Colors.PRIMARY} style={{marginRight: 15}}/> {item.date} às {item.time}</Text>

        </View>
        
      )}
    
      /> : <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '20%', color: Colors.GRAY, fontWeight: 'bold'}}>Ainda não há clientes agendados. Convide-os agora mesmo!</Text>}
    </View>
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