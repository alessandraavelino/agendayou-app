import { ScrollView, StyleSheet, ToastAndroid, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity} from 'react-native'
import React, {useState, useEffect } from 'react'
import Colors from '../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import Heading from '../../Components/Heading';
import RNPickerSelect from 'react-native-picker-select';
import { useUser } from '@clerk/clerk-expo';
import GlobalApi from '../../Utils/GlobalApi';
import axios from 'axios';

// https://servicodados.ibge.gov.br/api/v1/localidades/estados/{pb}/municipios
// https://servicodados.ibge.gov.br/api/v1/localidades/estados/
export default function RegisterServiceModal({hideModal}) {
  const [name, setName] = useState()
  const [contact, setContact] = useState()
  const [category, setCategory] = useState()
  const [serviceType, setServiceType] = useState()
  const [about, setAbout] = useState()

  const [state, setState] = useState("UF");
  const [city, setCity] = useState("Cidade");

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);


  const {user} = useUser()

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
      .then(response => {
        const stateAbbreviations = response.data.map(state => ({
          label: state.sigla,
          value: state.sigla,
          key: state.id
        }));
        setState(stateAbbreviations);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedState) {
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`)
        .then(response => {
          const cityNames = response.data.map(city => ({
            label: city.nome,
            value: city.nome
          }));
          setCity(cityNames);
        })
        .catch(error => {
          console.error('Error fetching cities:', error);
        });
    }
  }, [selectedState]);

  const createNewBusiness = () => {
    if (!name || !about) {
      ToastAndroid.show("Por favor, selecione uma Data e Hora!", ToastAndroid.LONG)
      return
      
    }
    const data = {
      name: name,
      email: user?.primaryEmailAddress,
      contactPerson: contact,
      address: `${selectedCity}, ${selectedState}`,
      about: about,
      serviceType: serviceType,
      about: about,
      category: category
    }

    GlobalApi.createBusinessList(data).then(resp => {
      ToastAndroid.show("Cadastro realizado com sucesso!", ToastAndroid.LONG)
      hideModal()
    })
  }
  
  return (
    <ScrollView horizontal={false}>
      <KeyboardAvoidingView style={{padding: 20}}>
      <TouchableOpacity onPress={() =>hideModal()} style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 20}}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
        <Text style={{fontSize: 25}}>Cadastrar Serviço</Text>
      </TouchableOpacity>
        <View style={{paddingTop: 20}}>
          <Heading text={'Nome da Empresa'} />
          <TextInput onChangeText={(text) => setName(text)}  value={name} style={styles.noteText}/>
        </View>
        <View style={{paddingTop: 20}}>
          <Heading text={'Tipo de Serviço'} />
          <TextInput onChangeText={(text) => setServiceType(text)} value={serviceType} style={styles.noteText}/>
        </View>
        <View style={{paddingTop: 20}}>
          <Heading text={'Telefone'} />
          <TextInput onChangeText = {(text) => setContact(text)} value={contact} keyboardType='numeric' style={styles.noteText}/>
        </View>
        <View style={{paddingTop: 20}}>
        <Heading text={'Selecione seu endereço'} />
      <View style={styles.teste}>
      <View style={styles.select}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedState(value)}
          items={[
            { label: 'UF', value: 'UF' },
            ...state // Adicionando as siglas dos estados como opções
          ]}
          value={selectedState}
        />
      </View>
      <View style={styles.select}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedCity(value)}
          items={[
            { label: 'Cidade', value: 'Cidade' },
            ...city
          ]}
          value={selectedCity}
        />
      </View>
      </View>
    </View>
    <View style={{paddingTop: 20}}>
    <Heading text={'Categoria'} />

    <View style={styles.select}>
        <RNPickerSelect
        
          onValueChange={(value) => setCategory(value)}
          items={[
            { label: 'Beleza', value: 'Beleza' },
            { label: 'Saúde', value: 'Saúde' },
            { label: 'Reparos', value: 'Reparos' },
            { label: 'Pet Shop', value: 'Pet Shop' },
          ]}
          value={category}
        />
      </View>
      <View style={{paddingTop: 20}}>
        <Heading text={'Fale sobre seus serviços'} />
        <TextInput onChangeText= {(text) => setAbout(text)} value={about} numberOfLines={4} multiline={true} placeholder={'Descreva quais são as suas habilidades e o que propõe aos seus clientes...'}  style={styles.noteTextArea}/>
      </View>
      <View style={{paddingTop: 20}}>
        <Text>* Iremos avaliar seu cadastro e caso seja aprovado, entraremos em contato via WhatsApp ou Email.</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', margin: 7, top:20, gap: 8}}>
      <TouchableOpacity style={styles.messageBtn} onPress={() => hideModal()}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: Colors.PRIMARY}}>Cancelar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bookingBtn} onPress={() => createNewBusiness()}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: Colors.WHITE}}>Cadastrar</Text>
      </TouchableOpacity>
    </View>

    </View>
    

      </KeyboardAvoidingView>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  noteText: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    fontSize: 16,
    borderColor: Colors.PRIMARY
  },
  select: {
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    padding: 1,
    fontSize: 10,
    justifyContent: "center",
    borderColor: Colors.PRIMARY,
  },
  teste: {
    flexDirection: 'row',
    gap: 10
  },
  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    fontSize: 16,
    textAlignVertical: 'top',
    borderColor: Colors.PRIMARY
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