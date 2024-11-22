import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import NewRoutine from '../screens/NewRoutine';

export default function AddRoutineButton({ navigation }) {
  
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={() => navigation.navigate(NewRoutine)}
    >
      <Text style={styles.buttonText}>Adicionar Nova Rotina</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00796B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

