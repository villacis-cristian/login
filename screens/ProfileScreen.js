import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { C, F } from '../styles/theme';

export default function ProfileScreen({ route, navigation }) {

  const { docenteName, codigoRegistro } = route.params || {};
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);

      navigation.navigate('Home', {
        docenteName,
        codigoRegistro,
        profileImage: uri,
      });
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>■ PERFIL DOCENTE ■</Text>

      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            image
              ? { uri: image }
              : require('../assets/logo.png')
          }
          style={styles.avatar}
        />
        <Text style={styles.changeText}>▶ CAMBIAR FOTO</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        Docente Activo: {docenteName}
      </Text>

      <Text style={styles.text}>
        Código de Registro: {codigoRegistro}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: C.green,
    fontFamily: F.mono,
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: C.accent,
  },
  changeText: {
    color: C.offwhite,
    fontFamily: F.mono,
    marginTop: 10,
  },
  text: {
    color: C.white,
    fontFamily: F.mono,
    marginTop: 10,
  },
});
