import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';

import CustomButton from '../components/CustomButton';
import { C, F } from '../styles/theme';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .required('El usuario es obligatorio'),

  email: Yup.string()
    .email('Correo inválido')
    .required('El correo es obligatorio'),

  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('La contraseña es obligatoria'),
});

export default function RegisterScreen({
  navigation,
}) {
  const handleRegister = async (
    values
  ) => {

    console.log('===================');
    console.log('REGISTER');
    console.log('===================');

    console.table(values);

    try {

      await RegisterSchema.validate(
        values,
        {
          abortEarly: false,
        }
      );

      console.log(
        '✅ Registro válido'
      );

      Alert.alert(
        'Registro',
        'Usuario registrado correctamente'
      );

      navigation.navigate('Login');

    } catch (error) {

      console.log(
        '❌ Errores Yup'
      );

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
        username: '',
        email: '',
        password: '',
      }}
      validationSchema={
        RegisterSchema
      }
      onSubmit={handleRegister}
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

          <Text style={styles.title}>
            REGISTRO
          </Text>

          <Text style={styles.label}>
            USUARIO
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor={C.muted}
            value={values.username}
            onChangeText={handleChange(
              'username'
            )}
            onBlur={handleBlur(
              'username'
            )}
          />

          {touched.username &&
          errors.username ? (
            <Text style={styles.error}>
              {errors.username}
            </Text>
          ) : (
            <Text style={styles.helper}>
              Ingrese un usuario.
            </Text>
          )}

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
            onChangeText={handleChange(
              'email'
            )}
            onBlur={handleBlur(
              'email'
            )}
          />

          {touched.email &&
          errors.email ? (
            <Text style={styles.error}>
              {errors.email}
            </Text>
          ) : (
            <Text style={styles.helper}>
              Debe contener @ y dominio.
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
            onChangeText={handleChange(
              'password'
            )}
            onBlur={handleBlur(
              'password'
            )}
          />

          {touched.password &&
          errors.password ? (
            <Text style={styles.error}>
              {errors.password}
            </Text>
          ) : (
            <Text style={styles.helper}>
              Mínimo 6 caracteres.
            </Text>
          )}

          <CustomButton
            title="Crear Cuenta"
            onPress={handleSubmit}
          />

          <CustomButton
            title="Volver al Login"
            onPress={() =>
              navigation.navigate(
                'Login'
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