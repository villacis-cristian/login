import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  return (

    <View style={styles.container}>

      <LinearGradient
        colors={['#0a0a1a', '#12083a', '#0D0D0D']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.orb1} />
      <View style={styles.orb2} />

      <View style={styles.topSection}>

        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          AVASHI'KOL
        </Text>

        <Text style={styles.subtitle}>
          Futuristic React Native Login
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.loginText}>
          LOGIN
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.3)"
          value={correo}
          onChangeText={setCorreo}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.3)"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >

          <Text style={styles.buttonText}>
            Sign In
          </Text>

        </TouchableOpacity>

      </View>

    </View>

  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  orb1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 999,
    backgroundColor: 'rgba(91,44,213,0.2)',
    top: -50,
    right: -50,
  },

  orb2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: 'rgba(255,214,10,0.08)',
    bottom: -30,
    left: -30,
  },

  topSection: {
    alignItems: 'center',
    marginBottom: 30,
  },

  logo: {
    width: 110,
    height: 110,
    marginBottom: 10,
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 2,
  },

  subtitle: {
    color: 'rgba(255,255,255,0.4)',
    marginTop: 6,
  },

  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(91,44,213,0.3)',
    borderRadius: 20,
    padding: 25,
  },

  loginText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    paddingVertical: 14,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#5B2CD5',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1,
  },

});

export default LoginScreen;