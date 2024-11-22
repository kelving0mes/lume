import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { firebaseApp } from '../services/FirebaseConfig'
import Login from '../screens/Login';

const auth = getAuth(firebaseApp);

export default function LogoutButton({ navigation }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate(Login);
    } catch (error) {
      Alert.alert("Erro ao sair: ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00796B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    minWidth : 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

