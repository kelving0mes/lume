import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { addDevice } from '../API/ApiDevices'; 
import { useTheme } from '../hooks/useTheme';

export default function NewDevice({ navigation }) {
  const {theme} = useTheme();
  const [deviceName, setDeviceName] = useState('');
  const [deviceConsumption, setDeviceConsumption] = useState('');
  const [deviceType, setDeviceType] = useState('');

  const handleAddDevice = async () => {
    if (!deviceName || !deviceConsumption || !deviceType) {
      Alert.alert("Todos os campos são obrigatórios!");
      return;
    }

    const deviceData = {
      nome: deviceName,
      consumoMedio: parseFloat(deviceConsumption),
      tipo: deviceType,
      dataInstalacao: new Date().toISOString(),
    };

    try {
      await addDevice(deviceData);
      Alert.alert("Dispositivo adicionado com sucesso!");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Erro ao adicionar dispositivo", e.message);
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#F5F5F5' : '#372f36',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      textAlign: 'center',
      color: theme === 'light' ? '#424242' : '#FFFFFF',
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
      backgroundColor: theme === 'light' ? '#fff' : '#fff',
      color: theme === 'light' ? '#333' : '#000',
    },
    button: {
      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      backgroundColor: '#00796B',
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
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
      <TouchableOpacity style={styles.button} onPress={handleAddDevice}>
        <Text style={styles.buttonText}>Adicionar Dispositivo</Text>
      </TouchableOpacity>
    </View>
  );
}
