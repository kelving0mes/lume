import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, Alert, SafeAreaView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { addRoutine } from '../API/ApiRoutines';
import { getDevices } from '../API/ApiDevices'; 
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { TouchableOpacity } from 'react-native';

export default function NewRoutine({ navigation }) {
  const {theme} = useTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [devices, setDevices] = useState([]);

  const fetchDevices = async () => {
    try {
      const devicesData = await getDevices(); 
      setDevices(devicesData);
    } catch (error) {
      Alert.alert('Erro ao carregar dispositivos', error.message);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchDevices();
    }, [])
  );
  useEffect(() => {
    fetchDevices();
  }, []);

  const handleSaveRoutine = async () => {
    if (!name || !description || !startTime || !endTime || !deviceId) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    const routineData = {
      nome: name,
      descricao: description,
      horaInicio: startTime,
      horaFim: endTime,
      dispositivo: deviceId,
    };

    try {
      await addRoutine(routineData);
      Alert.alert('Sucesso', 'Rotina criada com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao salvar rotina', error.message);
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Adicionar Nova Rotina</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da Rotina"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora de Início (ex: 10:30)"
        value={startTime}
        onChangeText={setStartTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora de Fim (ex: 11:00)"
        value={endTime}
        onChangeText={setEndTime}
      />

      <RNPickerSelect
        onValueChange={(value) => setDeviceId(value)}
        items={devices.map((device) => ({
          label: device.nome,
          value: device.id,
        }))}
        value={deviceId}
        placeholder={{
          label: 'Selecione o dispositivo',
          value: null,
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveRoutine}>
        <Text style={styles.buttonText}>Adicionar Rotina</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
