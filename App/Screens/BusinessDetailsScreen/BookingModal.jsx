import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import moment from 'moment';
export default function BookingModal({businessId, hideModal}) {

  const [timeList, setTimeList] = useState()
  const [selectedTime, setSelectedTime] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const [note, setNote] = useState()
  const {user} = useUser()
  useEffect(() => {
    getTime()

  }, [])

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i+':00'
      })
      timeList.push({
        time: i+':30'
      })

    }
    for (let i = 13; i <= 21
      ; i++) {
      timeList.push({
        time: i+':00'
      })
      timeList.push({
        time: i+':30'
      })

    }
    setTimeList(timeList)
  }

  const createNewBooking = () => {
    if (!selectedTime || !selectedDate) {
      ToastAndroid.show("Por favor, selecione uma Data e Hora!", ToastAndroid.LONG)
      
    }
    const data = {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress,
      time: selectedTime,
      date: moment(selectedDate).format('DD-MMM-YYYY'),
      note: note,
      businessId: businessId

    }
    GlobalApi.createBooking(data).then(resp => {
      ToastAndroid.show("Agendamento criado com sucesso!", ToastAndroid.LONG)
      hideModal()
    })
  }

  return (
    <ScrollView>
    <KeyboardAvoidingView style={{padding: 20}}>
      <TouchableOpacity onPress={() =>hideModal()} style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 20}}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
        <Text style={{fontSize: 25}}>Agendar</Text>

        
      </TouchableOpacity>
      <Heading text={'Selecione uma data'}/>
      <View style={styles.calendarContainer}>
      <CalendarPicker onDateChange={setSelectedDate}  width={340} minDate={Date.now()} todayBackgroundColor={Colors.BLACK} todayTextStyle={{color: Colors.WHITE}} selectedDayColor={Colors.PRIMARY} selectedDayTextColor={Colors.WHITE} />
      </View>

      <View style={{marginTop:20}}>
        <Heading text={'Selecione um horário'} />
        <FlatList 
          data={timeList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => setSelectedTime(item.time)} style={{marginRight: 5}}>
              <Text style={[ selectedTime == item.time ? styles.selectedTime : styles.unselectedTime] }>{item.time}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{paddingTop: 20}}>
        <Heading text={'Observação'} />
        <TextInput numberOfLines={4} multiline={true} placeholder={'Envie alguma sugestão ou requisito para o seu agendamento'} onChange = {(text) => setNote(text)} style={styles.noteTextArea}/>
      </View>

      <TouchableOpacity onPress={() => createNewBooking()} style={{marginTop: 15}}>
        <Text style={styles.confirmBtn}>Confirmar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15
  },

  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE

  },
  unselectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.PRIMARY

  },
  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    fontSize: 16,
    textAlignVertical: 'top',
    borderColor: Colors.PRIMARY
  },
  confirmBtn: {
    textAlign: 'center',
    fontSize: 17,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    padding: 13,
    borderRadius: 99,
    elevation: 3


  }

})