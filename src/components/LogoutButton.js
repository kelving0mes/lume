import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { firebaseApp } from '../services/FirebaseConfig'
import Login from '../screens/Login';
import { useTheme } from '../hooks/useTheme';

const auth = getAuth(firebaseApp);

export default function LogoutButton({ navigation }) {
  const {theme} = useTheme()
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate(Login);
    } catch (error) {
      Alert.alert("Erro ao sair: ", error.message);
    }
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme === 'light' ? '#00796B' : '#B2DFDB',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: theme === 'light' ? '#FFFFFF' : '#121212',
      fontSize: 18,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

