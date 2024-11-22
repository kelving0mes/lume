import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, StatusBar, SafeAreaView } from 'react-native';
import { getDevices } from '../API/ApiDevices';
import { useTheme } from '../hooks/useTheme';
import { useFocusEffect } from '@react-navigation/native';

export default function AvgConsumption() {
  const {theme} = useTheme();
  const [devices, setDevices] = useState([]);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [averageConsumption, setAverageConsumption] = useState(0);

  const fetchDevices = async () => {
    try {
      const devicesList = await getDevices();
      devicesList.sort((a, b) => parseFloat(b.consumoMedio) - parseFloat(a.consumoMedio));
      setDevices(devicesList);
      calculateTotals(devicesList);
    } catch (error) {
      Alert.alert('Erro ao buscar dispositivos:', error.message);
    }
  };

  const calculateTotals = (devicesList) => {
    const total = devicesList.reduce((acc, device) => acc + parseFloat(device.consumoMedio), 0);
    const average = total / devicesList.length;
    setTotalConsumption(total);
    setAverageConsumption(average.toFixed(2));
  };

  useFocusEffect(
    React.useCallback(() => {
        fetchDevices();
    }, [])
);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#F5F5F5' : '#372f36',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      width: '100%',
    },
    title: {
      marginTop: 10,
      color: theme === 'light' ? '#424242' : '#FFFFFF',
      fontSize: 24,
      marginBottom: 20,
      marginLeft: 10,
      fontWeight: 'bold',
      alignSelf: 'flex-start',
    },
    avgText: {
      color: theme === 'light' ? '#333' : '#F5F5F5',
      fontSize: 18,
      marginBottom: 20,
    },  
    deviceCard: {
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      backgroundColor: theme === 'light' ? '#B2DFDB' : '#00796B',
      borderRadius: 8,
      padding: 15,
      marginBottom: 20,
      elevation: 3,
      minWidth: '100%',
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
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={theme === 'light' ? '#F5F5F5' : '#1B1A26'} />
      <Text style={styles.title}>Consumo de Energia</Text>
      <Text style={styles.avgText}>Total de Consumo: {totalConsumption} KW/h</Text>
      <Text style={styles.avgText}>Média de Consumo: {averageConsumption} KW/h</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.deviceCard}>
            <Text style={styles.deviceName}>{item.nome}</Text>
            <Text style={styles.deviceDetails}>Consumo: {item.consumoMedio} KW/h</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
