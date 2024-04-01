import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import GlobalApi from '../../Utils/GlobalApi';
import BusinessListItem from './BusinessListItem';
import Colors from '../../Utils/Colors';
import PageHeading from '../../Components/PageHeading';

export default function BusinessListByCategoryScreen() {
  const param = useRoute().params;
  const navigation = useNavigation();
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    param && getBusinessByCategory()
  }, [param])

  const getBusinessByCategory = () => {
    GlobalApi.getBusinessListByCategory(param.category).then(resp => {
      setBusinessList(resp.businessLists)})
  }
  return (
    <View style={{padding:20, paddingTop: 30}}>
      <PageHeading title={param.category} />

      
      {businessList?.length > 0 ? <FlatList 
      horizontal={false}
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