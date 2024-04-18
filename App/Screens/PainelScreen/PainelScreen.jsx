import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import PageHeading from '../../Components/PageHeading';
import Heading from '../../Components/Heading';
import BookingsBusiness from './BookingsBusiness';
import Colors from '../../Utils/Colors';

export default function PainelScreen() {
  return (
    <View style={{ padding: 20 }}>
      <PageHeading title="Painel" />

      {/* Dashboard Cards */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <View style={[styles.dashboardCard, { backgroundColor: Colors.PRIMARY }]}>
          <Text style={{color: Colors.WHITE, fontWeight: 'bold', fontSize: 20}}>100</Text>
          <Text style={{color: Colors.WHITE}}>Agendados</Text>
        </View>
        <View style={[styles.dashboardCard, { backgroundColor: '#FF6347' }]}>
          <Text style={{color: Colors.WHITE, fontWeight: 'bold', fontSize: 20}}>100</Text>
          <Text style={{color: Colors.WHITE}}>Ausentes</Text>
        </View>
        <View style={[styles.dashboardCard, { backgroundColor: '#00bc45' }]}>
          <Text style={{color: Colors.WHITE, fontWeight: 'bold', fontSize: 20}}>100</Text>
          <Text style={{color: Colors.WHITE}}>Atendidos</Text>
        </View>
      </View>

      {/* Clientes Agendados */}
      <View style={{ marginTop: 20 }}>
        <Heading text="Clientes Agendados" />
        <BookingsBusiness />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dashboardCard: {
    flex: 1,
    borderColor: 'gray',
    padding: 18,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginHorizontal: 5,
    color: "#fff"
  },
});
