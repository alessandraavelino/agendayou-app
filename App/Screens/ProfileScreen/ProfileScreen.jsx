import { View, Text, Image, FlatList, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';
import { useClerk } from "@clerk/clerk-react";
import { useNavigation } from '@react-navigation/native'

import RegisterServiceModal from './RegisterServiceModal';

export default function ProfileScreen() {
  const { signOut } = useClerk();
  const {user} = useUser()
  const [showModal, setShowModal] = useState(false)

  

  const profileMenu = [
    {
      id: 1,
      name: 'Home',
      icon: 'home'
    },
    {
      id: 2,
      name: 'Cadastrar Serviço',
      icon: 'calendar'
    },
    {
      id: 3,
      name: 'Suporte',
      icon: 'email'
    },
    {
      id: 4,
      name: 'Sair',
      icon: 'logout'
    },
  ]
    
  return (
    <View >
      <View style={{padding: 20, paddingTop: 30, backgroundColor: Colors.PRIMARY}}>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: Colors.WHITE}}>Perfil</Text>
      <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding:20, backgroundColor: Colors.PRIMARY}}>
        <Image source={{uri: user.imageUrl}} style={{width: 90, height: 90, borderRadius: 99}} />
        <Text style={{fontSize: 26, marginTop: 8, color: Colors.WHITE}}>{user.fullName}</Text>
        <Text style={{fontSize: 15, marginTop: 8, color: Colors.WHITE}}>{user?.primaryEmailAddress.emailAddress}</Text>
      </View>

      </View>
      <View style={{ paddingTop: 50}}>
        <FlatList 
          data={profileMenu}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={ ()  => {
              if (item.name === "Sair") {
                 signOut();
              }
              if (item.name === "Cadastrar Serviço") {
                setShowModal(true)
              }
            }} style={{display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 40, paddingHorizontal: 80}}>
              <MaterialCommunityIcons name={item.icon} size={35} color={Colors.PRIMARY} />
              <Text style={{fontSize: 20, }}>{item.name}</Text>



            </TouchableOpacity>
          )}
        />
      </View>
      <Modal animationType='slide' visible={showModal}>
      <RegisterServiceModal hideModal={() => setShowModal(false)} />
    </Modal>
      
      
    </View>
  )
}