import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Modal, Alert, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { updateDevice } from '../API/ApiDevices';
import { useTheme } from '../hooks/useTheme';

export default function EditDeviceModal({ isVisible, device, onClose, onUpdate }) {
  const { theme } = useTheme();
  const [updatedName, setUpdatedName] = useState('');
  const [updatedConsumption, setUpdatedConsumption] = useState('');
  const [updatedType, setUpdatedType] = useState('');

  useEffect(() => {
    if (device) {
      setUpdatedName(device.nome);
      setUpdatedConsumption(device.consumoMedio.toString());
      setUpdatedType(device.tipo);
    }
  }, [device]);

  const handleUpdate = async () => {
    if (!updatedName || !updatedConsumption || !updatedType) {
      Alert.alert("Todos os campos são obrigatórios!");
      return;
    }

    const updatedDevice = {
      nome: updatedName,
      consumoMedio: parseFloat(updatedConsumption),
      tipo: updatedType,
    };

    try {
      await updateDevice(device.id, updatedDevice);
      onUpdate();
      onClose();
    } catch (error) {
      Alert.alert("Erro ao atualizar dispositivo: ", error.message);
    }
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
    modalButtons: {
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
          <Text style={styles.modalTitle}>Editar Dispositivo</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome do Dispositivo"
            value={updatedName}
            onChangeText={setUpdatedName}
          />

          <TextInput
            style={styles.input}
            placeholder="Consumo em KW/h"
            keyboardType="numeric"
            value={updatedConsumption}
            onChangeText={setUpdatedConsumption}
          />

          <RNPickerSelect
            onValueChange={(value) => setUpdatedType(value)}
            items={[
              { label: 'Iluminação', value: 'lamp' },
              { label: 'Eletrodoméstico', value: 'washing_machine' },
              { label: 'Eletroeletrônico', value: 'television' },
            ]}
            value={updatedType}
            placeholder={{
              label: 'Selecione o tipo de dispositivo',
              value: null,
            }}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

