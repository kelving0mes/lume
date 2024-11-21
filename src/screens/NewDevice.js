import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/FirebaseConfig';

export default function NewDevice({ navigation }) {
  const [deviceName, setDeviceName] = useState('');
  const [deviceConsumption, setDeviceConsumption] = useState('');
  const [deviceType, setDeviceType] = useState('');

  const handleAddDevice = async () => {
    try {
      await addDoc(collection(db, 'devices'), {
        name: deviceName,
        consumption: deviceConsumption,
        type: deviceType,
      });
      Alert.alert("Dispositivo adicionado com sucesso");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Erro ao adicionar dispositivo: ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Novo Dispositivo</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Dispositivo"
        value={deviceName}
        onChangeText={setDeviceName}
      />

      <TextInput
        style={styles.input}
        placeholder="Consumo em KW/h"
        keyboardType="numeric"
        value={deviceConsumption}
        onChangeText={setDeviceConsumption}
      />

      <RNPickerSelect
        onValueChange={(value) => setDeviceType(value)}
        items={[
          { label: 'Iluminação', value: 'lamp' },
          { label: 'Eletrodoméstico', value: 'washing_machine' },
          { label: 'Eletroeletrônico', value: 'television' },
        ]}
        placeholder={{
          label: 'Selecione o tipo de dispositivo',
          value: null,
        }}
        
      />
      <Button title="Adicionar Dispositivo" onPress={handleAddDevice} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
});
