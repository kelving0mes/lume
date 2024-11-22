import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from '../hooks/useTheme';
import { updateRoutine } from '../API/ApiRoutines';
import { getDevices } from '../API/ApiDevices'; 

export default function EditRoutineModal({ isVisible, routine, onClose, onUpdate }) {
  const { theme } = useTheme();
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

  useEffect(() => {
    if (routine) {
      setName(routine.nome);
      setDescription(routine.descricao);
      setStartTime(routine.horaInicio);
      setEndTime(routine.horaFim);
      setDeviceId(routine.dispositivo);
    }
    fetchDevices();
  }, [routine]);

  const handleSave = async () => {
    if (!name || !description || !startTime || !endTime ) {
      Alert.alert("Todos os campos são obrigatórios!");
      return;
    }

    const updatedRoutine = {
      nome: name,
      descricao: description,
      horaInicio: startTime,
      horaFim: endTime,
      dispositivo: deviceId
    };

    try {
      await updateRoutine(routine.id, updatedRoutine);
      onUpdate();
      onClose();
      Alert.alert('Rotina atualizada com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao atualizar rotina', error.message);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      padding: 20,
      borderRadius: 8,
      width: '80%',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: theme === 'light' ? '#333' : '#fff',
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 15,
      paddingLeft: 8,
      borderRadius: 5,
      backgroundColor: theme === 'light' ? '#fff' : '#fff',
      color: theme === 'light' ? '#333' : '#000',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      width: '45%',
    },
    saveButton: {
      backgroundColor: '#00796B',
    },
    cancelButton: {
      backgroundColor: '#FF5252',
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Rotina</Text>

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
            placeholder={{
              label: 'Selecione o dispositivo',
              value: null,
            }}
            value={deviceId}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
