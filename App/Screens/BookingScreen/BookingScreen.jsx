import { View, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeading from '../../Components/PageHeading'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors';
import BusinessListItem from '../BusinessListByCategoryScreen/BusinessListItem'

export default function BookingScreen() {

  

  const { user } = useUser()
  const [bookingList, setBookingList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    user && getUserBookings();
  }, [user])

  const getUserBookings = () => {
    setLoading(true)
    GlobalApi.getUserBooking(user.primaryEmailAddress).then(resp => {
      setBookingList(resp.bookings)
      setLoading(false)

    })
      
  }
  return (
    <View style={{padding: 20}}>
      <PageHeading title={'Meus agendamentos'}/>

      {bookingList.length > 0 ? <View  style={{marginTop: 20}}>
        <FlatList 
        horizontal={false}
        data={bookingList}
        onRefresh={() => getUserBookings()}
        refreshing={loading}
        renderItem={({item, index}) => (
          <BusinessListItem business={item.businessList} booking={item}/>
        )}
        
        />
      </View> : <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '20%', color: Colors.GRAY, fontWeight: 'bold'}}>Ainda não há agendamentos para hoje. Comece agendar agora mesmo!</Text>}
    </View>
  )
}