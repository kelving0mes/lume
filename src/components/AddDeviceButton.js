import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NewDevice from '../screens/NewDevice';
import { useTheme } from '../hooks/useTheme';

export default function AddDeviceButton({ navigation }) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    button: {
      width: 60,
      height: 60,
      backgroundColor: theme === 'light' ? '#00796B' : '#B2DFDB',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', 
      bottom: 30,
      right: 30, 
    },
  });

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(NewDevice)}
    >
      <Ionicons name="add" size={30} color={"white"} />
    </TouchableOpacity>
  );
}

