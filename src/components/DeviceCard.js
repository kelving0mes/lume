import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/FirebaseConfig';

const getDeviceIcon = (type) => {
  switch (type) {
    case 'lamp':
      return 'lamp-outline';
    case 'washing_machine':
      return 'washing-machine';
    case 'television':
      return 'television-classic';
    default:
      return 'devices';
  }
};

export default function DeviceCard({ id, name, consumption, type, onDelete, onEdit }){
  const handleDelete = async () => {
    try {
      const deviceRef = doc(db, 'devices', id)
      await deleteDoc(deviceRef);
      onDelete();
    } catch (error) {
      Alert.alert("Erro ao excluir dispositivo: ", error.message);
    }
  };

  return (
    <View style={styles.card}>
      <MaterialCommunityIcons
        name={getDeviceIcon(type)}
        size={40}
        color="#4CAF50"
        style={styles.icon}
      />
      <View style={styles.cardContent}>
        <Text style={styles.deviceName}>{name}</Text>
        <Text style={styles.deviceDetails}>Consumo: {consumption} KW/h</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={() => onEdit(id)}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deviceDetails: {
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF5252',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});
