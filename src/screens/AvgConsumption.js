import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { db } from '../services/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

export default function AvgConsumption(){
  const [devices, setDevices] = useState([]);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [averageConsumption, setAverageConsumption] = useState(0);

  const fetchDevices = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'devices'));
      const devicesList = [];
      querySnapshot.forEach((doc) => {
        devicesList.push({ id: doc.id, ...doc.data() });
      });
      devicesList.sort((a, b) => parseFloat(b.consumption) - parseFloat(a.consumption));
      setDevices(devicesList);
      calculateTotals(devicesList);
    } catch (error) {
      Alert.alert("Erro ao buscar dispositivos: ", error.message);
    }
  };

  const calculateTotals = (devicesList) => {
    const total = devicesList.reduce((acc, device) => acc + parseFloat(device.consumption), 0);
    const average = total / devicesList.length;
    setTotalConsumption(total);
    setAverageConsumption(average.toFixed(2));
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchDevices();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consumo de Energia</Text>
      <Text>Total de Consumo: {totalConsumption} KW/h</Text>
      <Text>Média de Consumo: {averageConsumption} KW/h</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deviceCard}>
            <Text style={styles.deviceName}>{item.name}</Text>
            <Text>Consumo: {item.consumption} KW/h</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  deviceCard: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    marginVertical: 10,
    borderRadius: 5,
  },
  deviceName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
