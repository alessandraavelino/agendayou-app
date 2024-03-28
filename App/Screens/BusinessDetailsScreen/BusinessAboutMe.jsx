import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading';
import Colors from '../../Utils/Colors';

export default function BusinessAboutMe({business}) {
    const [isReadMore, setIsReadMore] = useState(false)

  return business && (
    <View>
        <Heading text={"Sobre"} />
            <Text style={{color: Colors.GRAY, fontSize: 16, lineHeight: 28}} numberOfLines={isReadMore ? 20 : 5}>{business?.about}</Text>
        <TouchableOpacity onPress = {() => setIsReadMore(!isReadMore)
        }>
            <Text style={{color: Colors.PRIMARY, fontSize: 16}}>{isReadMore ? 'Ler menos' : 'Ler mais'}</Text>
        </TouchableOpacity>
    </View>
    
  )
}