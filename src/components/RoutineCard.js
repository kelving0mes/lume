import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useTheme } from '../hooks/useTheme';

export default function RoutineCard({ id, name, description, startTime, endTime, device, onDelete, onEdit }) {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'flex-start',
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
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    routineName: {
      color: theme === 'light' ? '#333' : '#F5F5F5',
      fontSize: 18,
      fontWeight: 'bold',
      flexWrap: 'wrap',
      overflow: 'hidden',
      width: '80%',
    },
    routineDetails: {
      color: theme === 'light' ? '#333' : '#F5F5F5',
      fontSize: 14,
    },
    buttonContainer: {
      flexDirection: 'column', 
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
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
        name="clock-time-four-outline"
        size={40}
        color={theme === 'light' ? '#333' : '#F5F5F5'}
        style={styles.icon}
      />
      <View style={styles.cardContent}>
        <Text style={styles.routineName} numberOfLines={1}>{name}</Text>
        <Text style={styles.routineDetails}>Descrição: {description}</Text>
        <Text style={styles.routineDetails}>Início: {startTime}</Text>
        <Text style={styles.routineDetails}>Fim: {endTime}</Text>
        {device && <Text style={styles.routineDetails}>Dispositivo: {device}</Text>}
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
