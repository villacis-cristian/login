import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';

import CustomButton from '../components/CustomButton';
import { C, F } from '../styles/theme';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo inválido')
    .required('El correo es obligatorio'),

  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('La contraseña es obligatoria'),
});

export default function LoginScreen({ navigation }) {
  const handleLogin = async (values) => {
    console.log('===================');
    console.log('LOGIN');
    console.log('===================');

    console.table(values);

    try {
      await LoginSchema.validate(values, {
        abortEarly: false,
      });

      console.log('✅ Validación Yup correcta');

      Alert.alert(
        'Acceso Correcto',
        'Bienvenido al sistema'
      );

      navigation.navigate('Home', {
        docenteName: values.email,
        codigoRegistro: 2026104,
      });

    } catch (error) {
      console.log('❌ Errores Yup');

      error.inner.forEach((err) => {
        console.log(
          `${err.path}: ${err.message}`
        );
      });
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>

          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            LOGIN
          </Text>

          <Text style={styles.label}>
            CORREO
          </Text>

          <TextInput
            style={styles.input}
            placeholder="correo@correo.com"
            placeholderTextColor={C.muted}
            autoCapitalize="none"
            keyboardType="email-address"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
          />

          {touched.email && errors.email ? (
            <Text style={styles.error}>
              {errors.email}
            </Text>
          ) : (
            <Text style={styles.helper}>
              Ingrese un correo válido.
            </Text>
          )}

          <Text style={styles.label}>
            CONTRASEÑA
          </Text>

          <TextInput
            style={styles.input}
            placeholder="******"
            placeholderTextColor={C.muted}
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
          />

          {touched.password &&
          errors.password ? (
            <Text style={styles.error}>
              {errors.password}
            </Text>
          ) : (
            <Text style={styles.helper}>
              Debe tener mínimo 6 caracteres.
            </Text>
          )}

          <CustomButton
            title="Ingresar"
            onPress={handleSubmit}
          />

          <CustomButton
            title="Registrarse"
            onPress={() =>
              navigation.navigate(
                'Register'
              )
            }
          />

        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 15,
  },

  title: {
    color: C.green,
    fontFamily: F.mono,
    fontSize: 24,
    marginBottom: 20,
  },

  label: {
    width: '90%',
    color: C.offwhite,
    fontFamily: F.mono,
    marginBottom: 5,
  },

  input: {
    width: '90%',
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.accent,
    color: C.white,
    padding: 12,
  },

  error: {
    width: '90%',
    color: C.red,
    marginTop: 4,
    marginBottom: 10,
    fontFamily: F.mono,
  },

  helper: {
    width: '90%',
    color: C.green,
    marginTop: 4,
    marginBottom: 10,
    fontFamily: F.mono,
  },
});