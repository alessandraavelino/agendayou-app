import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import GlobalApi from '../../Utils/GlobalApi';
import BusinessListItem from './BusinessListItem';
import Colors from '../../Utils/Colors';

export default function BusinessListByCategoryScreen() {
  const param = useRoute().params;
  const navigation = useNavigation();
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    console.log("teste")
    param && getBusinessByCategory()
  }, [param])

  const getBusinessByCategory = () => {
    GlobalApi.getBusinessListByCategory(param.category).then(resp => {
      setBusinessList(resp.businessLists)})
  }
  return (
    <View style={{padding:20, paddingTop: 30}}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center'}}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
        <Text style={{fontSize: 25}}>{param?.category}</Text>
      </TouchableOpacity>
      {businessList?.length > 0 ? <FlatList 
        style={{marginTop: 15}}
        data={businessList}
        renderItem={({item, index}) => (
          <BusinessListItem business={item} />


        )}
      /> :
      <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '20%', color: Colors.GRAY, fontWeight: 'bold'}}>Ainda não há nada aqui! :(</Text>}
      

    </View>
  )
}