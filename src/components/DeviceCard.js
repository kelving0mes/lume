import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useTheme } from '../hooks/useTheme';

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

export default function DeviceCard({ id, name, consumption, type, onDelete, onEdit }) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme === 'light' ? '#B2DFDB' : '#00796B',
      borderRadius: 8,
      padding: 15,
      marginBottom: 20,
      elevation: 3,
      width: '100%',
    },
    icon: {
      marginRight: 15,
    },
    cardContent: {
      flexDirection: 'column',
    },
    deviceName: {
      color: theme === 'light' ? '#333' : '#F5F5F5',
      fontSize: 18,
      fontWeight: 'bold',
    },
    deviceDetails: {
      color: theme === 'light' ? '#333' : '#F5F5F5',
      fontSize: 14,
    },
    buttonContainer: {
      maxWidth: 50,
      marginLeft: 'auto',
    },
    editButton: {
      backgroundColor: theme === 'light' ? '#f5f5f5' : '#bdbdbd',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginBottom: 5,
    },
    deleteButton: {
      backgroundColor: '#FF5252',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginTop: 5,
    },
  });

  return (
    <View style={styles.card}>
      <MaterialCommunityIcons
        name={getDeviceIcon(type)}
        size={40}
        color={theme === 'light' ? '#333' : '#F5F5F5'}
        style={styles.icon}
      />
      <View style={styles.cardContent}>
        <Text style={styles.deviceName}>{name}</Text>
        <Text style={styles.deviceDetails}>Consumo: {consumption} KW/h</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(id)}>
          <MaterialCommunityIcons name="pencil" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <MaterialCommunityIcons name="trash-can-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
