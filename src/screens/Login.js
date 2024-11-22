import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../services/FirebaseConfig';
import TabNavigation from '../routes/tabs.routes';
import { Image } from 'react-native';

const auth = getAuth(firebaseApp);

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate(TabNavigation);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate(TabNavigation);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor= '#00796B'/>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/Lume_logo.png')} style={styles.logo} />
        <Text style={styles.subtitleText}>Eficiência na ponta dos seus dedos</Text>
      </View>
      <View style={styles.cardContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#00796B',
    maxHeight: '60%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 250,
    marginBottom: 60,
  },
  logo: {
    width: 250,
    height: 250,
  },
  subtitleText: {
    fontSize: 18,
    color: '#F5F5F5',
    textAlign: 'center'
  },
  cardContainer: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    elevation: 6,
    borderRadius: 10,
    maxHeight: 'auto',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#00796B',
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

