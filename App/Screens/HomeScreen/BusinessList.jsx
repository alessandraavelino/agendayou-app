import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading'
import GlobalApi from '../../Utils/GlobalApi'
import BusinessListItemSmall from './BusinessListItemSmall'

export default function BusinessList() {

    const [businessLists, setBusinessLists] = useState([])

    useEffect(() => {
        getBusinessLists()
    }, [])

    const getBusinessLists = () => {
        GlobalApi.getBusinessLists().then(resp => {
            console.log(resp)
            setBusinessLists(resp?.businessLists)
        })
    }
  return (
    <View style={{marginTop: 20}}>
      <Heading text={"Últimos serviços"} isViewAll={true} />

      <FlatList 
       data={businessLists}
       horizontal={true}
       showsHorizontalScrollIndicator={false}
       renderItem={({item, index}) => (
        <View style={{marginRight: 10}}>
            <BusinessListItemSmall business={item} />

        </View>
        
       )}
      />
    </View>
  )
}