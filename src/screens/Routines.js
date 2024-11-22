import React, { useState} from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Alert, StatusBar, View } from 'react-native';
import { getRoutines, deleteRoutine } from '../API/ApiRoutines';
import { useTheme } from '../hooks/useTheme';
import AddRoutineButton from '../components/AddRoutineButton';
import { useFocusEffect } from '@react-navigation/native';
import RoutineCard from '../components/RoutineCard';
import EditRoutineModal from '../components/EditRoutineModal';


export default function Routines({ navigation }) {
  const { theme } = useTheme();
  const [routines, setRoutines] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  const fetchRoutines = async () => {
    try {
      const routinesData = await getRoutines();
      setRoutines(routinesData); 
    } catch (error) {
      Alert.alert('Erro ao carregar rotinas', error.message);
    }
  };

  const handleDeleteRoutine = async (id) => {
    try {
      await deleteRoutine(id);
      fetchRoutines();
      Alert.alert('Rotina excluída com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao excluir rotina', error.message);
    }
  };

  const openEditModal = (routine) => {
    setSelectedRoutine(routine);
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchRoutines();
    }, [])
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#F5F5F5' : '#372f36',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
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
    bottomSection: {
      marginTop: 20,
      width: '100%',
      marginBottom: 20,
      marginHorizontal: 10,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={theme === 'light' ? '#F5F5F5' : '#1B1A26'} />
      <Text style={styles.title}>Minhas Rotinas</Text>
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RoutineCard
            id={item.id}
            name={item.nome}
            description={item.descricao}
            startTime={item.horaInicio}
            endTime={item.horaFim}
            device={item.dispositivo}
            onDelete={() => handleDeleteRoutine(item.id)}
            onEdit={() => openEditModal(item)}
          />
        )}
      />
      <View style={styles.bottomSection}>
        <AddRoutineButton navigation={navigation} />
      </View>
      <EditRoutineModal
        isVisible={isModalVisible}
        routine={selectedRoutine}
        onClose={closeModal}
        onUpdate={fetchRoutines}
      />
    </SafeAreaView>
  );
}
