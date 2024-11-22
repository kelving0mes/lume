import axios from 'axios';

//const API_URL = 'http://{SEU_IP_LOCAL}:8080/rotina'; --Para rodar de forma local
const API_URL = 'https://wb-gs-lumi.azurewebsites.net/rotina';

export const getRoutines = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.content;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const deleteRoutine = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const addRoutine = async (routineData) => {
  try {
    const response = await axios.post(API_URL, routineData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const updateRoutine = async (id, routineData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, routineData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
