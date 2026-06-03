import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Share,
  ScrollView,
} from 'react-native';

import CustomButton from '../components/CustomButton';
import { C, F } from '../styles/theme';

export default function HomeScreen({ route, navigation }) {
  const { docenteName, codigoRegistro, profileImage } =
    route.params || {};

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (profileImage) {
      setImage(profileImage);
    }
  }, [profileImage]);

  const handleShare = async () => {
    await Share.share({
      message: `MENSAJE ENVIADO DESDE LA APP: ${docenteName} la asistencia se ha registrado correctamente.`,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.title}>
          ■ CONTROL DE ASISTENCIA ■
        </Text>

        <Text style={styles.subtitle}>
          SISTEMA ACADÉMICO
        </Text>
      </View>

      {/* PERFIL */}

      <View style={styles.card}>

        <Image
          source={
            image
              ? { uri: image }
              : require('../assets/logo.png')
          }
          style={styles.avatar}
          resizeMode="cover"
        />

        <Text style={styles.name}>
          {docenteName || 'USUARIO'}
        </Text>

        <Text style={styles.code}>
          REGISTRO #{codigoRegistro || '0000'}
        </Text>

      </View>

      {/* ESTADO */}

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          ESTADO DEL SISTEMA
        </Text>

        <Text style={styles.infoText}>
          ● CONEXIÓN ACTIVA
        </Text>

        <Text style={styles.infoText}>
          ● ASISTENCIA DISPONIBLE
        </Text>

        <Text style={styles.infoText}>
          ● PERFIL CARGADO
        </Text>
      </View>

      {/* BOTONES */}

      <View style={styles.buttonsContainer}>

        <CustomButton
          title="Firmar Asistencia"
          isDanger={true}
          onPress={handleShare}
        />

        <CustomButton
          title="Ir a Perfil"
          onPress={() =>
            navigation.navigate('Profile', {
              docenteName,
              codigoRegistro,
            })
          }
        />

      </View>

      {/* FOOTER */}

      <Text style={styles.footer}>
        © 2026 · REACT NATIVE APP
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: C.bg,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  header: {
    alignItems: 'center',
    marginBottom: 25,
  },

  title: {
    color: C.green,
    fontFamily: F.mono,
    fontSize: 18,
    letterSpacing: 2,
  },

  subtitle: {
    color: C.offwhite,
    fontFamily: F.mono,
    marginTop: 10,
  },

  card: {
    width: '100%',
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.accent,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: C.green,
    marginBottom: 15,
  },

  name: {
    color: C.white,
    fontFamily: F.mono,
    fontSize: 16,
    textAlign: 'center',
  },

  code: {
    color: C.offwhite,
    fontFamily: F.mono,
    marginTop: 8,
  },

  infoCard: {
    width: '100%',
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.accent,
    padding: 20,
    marginBottom: 20,
  },

  infoTitle: {
    color: C.green,
    fontFamily: F.mono,
    marginBottom: 12,
  },

  infoText: {
    color: C.white,
    fontFamily: F.mono,
    marginBottom: 8,
  },

  buttonsContainer: {
    width: '100%',
    gap: 15,
  },

  footer: {
    marginTop: 25,
    color: C.gray3,
    fontFamily: F.mono,
    fontSize: 12,
  },
});