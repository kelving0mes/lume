import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Modal, Alert } from 'react-native';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../services/FirebaseConfig';

export default function EditDeviceModal({ isVisible, device, onClose, onUpdate }) {
  const [updatedName, setUpdatedName] = useState('');
  const [updatedConsumption, setUpdatedConsumption] = useState('');
  const [updatedType, setUpdatedType] = useState('');

  useEffect(() => {
    if (device) {
      setUpdatedName(device.name);
      setUpdatedConsumption(device.consumption);
      setUpdatedType(device.type);
    }
  }, [device]);

  const handleUpdate = async () => {
    try {
      const deviceRef = doc(db, 'devices', device.id);
      await updateDoc(deviceRef, {
        name: updatedName,
        consumption: updatedConsumption,
        type: updatedType,
      });
      onUpdate();
      onClose();
    } catch (error) {
      Alert.alert("Erro ao atualizar dispositivo: ", error.message);
    }
  };

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

          <View style={styles.modalButtons}>
            <Button title="Cancelar" onPress={onClose} />
            <Button title="Salvar" onPress={handleUpdate} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
