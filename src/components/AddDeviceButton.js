import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NewDevice from '../screens/NewDevice';

export default function AddDeviceButton({ navigation }) {

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(NewDevice)}
    >
      <Ionicons name="add" size={30} color={"white"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#00796B',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    bottom: 30,
    right: 30, 
  },
});

