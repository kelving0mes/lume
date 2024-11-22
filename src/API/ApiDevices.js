import axios from 'axios';
import { Alert } from 'react-native';

const API_URL = 'http://192.168.15.104:8080/dispositivo';
//const API_URL = 'https://wb-gs-lumi.azurewebsites.net/dispositivo';

export const getDevices = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.content;
  } catch (error) {
    Alert.alert('Erro ao buscar dispositivos:', error.message);
    throw error;
  }
};

export const addDevice = async (deviceData) => {
  try {
    const response = await axios.post(API_URL, deviceData);
    return response.data;
  } catch (error) {
    Alert.alert('Erro ao criar dispositivo:', error.message);
    throw error;
  }
};

export const updateDevice = async (id, deviceData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, deviceData);
    return response.data;
  } catch (error) {
    Alert.alert('Erro ao atualizar dispositivo:', error.message);
    throw error;
  }
};

export const deleteDevice = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    Alert.alert('Erro ao excluir dispositivos:', error.message);
    throw error;
  }
};
