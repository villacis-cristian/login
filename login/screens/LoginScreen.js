import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [correoEnfocado, setCorreoEnfocado] = useState(false);
  const [contrasenaEnfocada, setContrasenaEnfocada] = useState(false);

  const escalaBoton = useRef(new Animated.Value(1)).current;
  const [botonPresionado, setBotonPresionado] = useState(false);

  const alPresionarIn = () => {
    setBotonPresionado(true);
    Animated.spring(escalaBoton, { toValue: 0.97, useNativeDriver: true }).start();
  };

  const alPresionarOut = () => {
    setBotonPresionado(false);
    Animated.spring(escalaBoton, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.raiz}>

      {/* PANEL IZQUIERDO */}
      <View style={styles.panelIzquierdo}>
        <LinearGradient
          colors={['#0a0a1a', '#12083a', '#1a0a2e']}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.superposicionGrid} pointerEvents="none" />

        <View style={[styles.orbe, styles.orbe1]} />
        <View style={[styles.orbe, styles.orbe2]} />

        <LinearGradient
          colors={['transparent', '#0D0D0D']}
          start={{ x: 0.4, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />

        <View style={styles.contenidoIzquierdo}>
          <Text style={styles.etiqueta}>// NEURAL ACCESS v3.0</Text>
          <Text style={styles.textoHero}>{"The future\nstarts here."}</Text>
          <Text style={styles.subHero}>
            Secure, intelligent, always on. Your gateway to next-gen infrastructure.
          </Text>

          <View style={styles.puntos}>
            <View style={[styles.punto, styles.puntoActivo]} />
            <View style={styles.punto} />
            <View style={styles.punto} />
          </View>
        </View>
      </View>

      {/* PANEL DERECHO */}
      <View style={styles.panelDerecho}>
        <Text style={styles.tituloLogin}>LOGIN</Text>
        <Text style={styles.subLogin}>Welcome back — enter your credentials</Text>

        <Text style={styles.etiquetaCampo}>EMAIL</Text>
        <TextInput
          style={[styles.input, correoEnfocado && styles.inputEnfocado]}
          placeholder="user@domain.com"
          placeholderTextColor="rgba(255,255,255,0.2)"
          value={correo}
          onChangeText={setCorreo}
          onFocus={() => setCorreoEnfocado(true)}
          onBlur={() => setCorreoEnfocado(false)}
          keyboardType="email-address"
          autoCapitalize="none"
          selectionColor="#5B2CD5"
        />

        <Text style={styles.etiquetaCampo}>PASSWORD</Text>
        <TextInput
          style={[styles.input, contrasenaEnfocada && styles.inputEnfocado]}
          placeholder="••••••••"
          placeholderTextColor="rgba(255,255,255,0.2)"
          value={contrasena}
          onChangeText={setContrasena}
          onFocus={() => setContrasenaEnfocada(true)}
          onBlur={() => setContrasenaEnfocada(false)}
          secureTextEntry
          selectionColor="#5B2CD5"
        />

        <TouchableOpacity style={styles.olvidoWrap}>
          <Text style={styles.olvidoTexto}>Forgot password?</Text>
        </TouchableOpacity>

        <Animated.View style={{ transform: [{ scale: escalaBoton }] }}>
          <TouchableOpacity
            style={[styles.botonPrimario, botonPresionado && styles.botonPrimarioActivo]}
            onPressIn={alPresionarIn}
            onPressOut={alPresionarOut}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={1}
          >
            <Text style={[
              styles.textoBotonPrimario,
              botonPresionado && styles.textoBotonPrimarioActivo
            ]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.divisor}>
          <View style={styles.lineaDivisor} />
          <Text style={styles.textoDivisor}>OR</Text>
          <View style={styles.lineaDivisor} />
        </View>

        <TouchableOpacity style={styles.botonSecundario}>
          <Text style={styles.textoBotonSecundario}>Create account</Text>
        </TouchableOpacity>

        <View style={styles.barraEstado}>
          <View style={styles.puntoEstado} />
          <Text style={styles.textoEstado}>ENCRYPTED · SECURE CONNECTION</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  raiz: { flex: 1, flexDirection: 'row', backgroundColor: '#0D0D0D' },

  panelIzquierdo: { flex: 3, overflow: 'hidden' },
  superposicionGrid: { ...StyleSheet.absoluteFillObject, opacity: 0.15 },

  orbe: { position: 'absolute', borderRadius: 999 },
  orbe1: { width: 200, height: 200, backgroundColor: 'rgba(91,44,213,0.35)', top: '20%', left: '10%' },
  orbe2: { width: 120, height: 120, backgroundColor: 'rgba(255,214,10,0.10)', bottom: '20%', right: '15%' },

  contenidoIzquierdo: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 32,
    paddingBottom: 48,
  },

  etiqueta: { fontSize: 10, fontWeight: '700', letterSpacing: 3, color: '#5B2CD5', marginBottom: 12 },
  textoHero: { fontSize: 28, fontWeight: '800', color: '#fff', lineHeight: 32, marginBottom: 14 },
  subHero: { fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 18, maxWidth: 180 },

  puntos: { flexDirection: 'row', gap: 6, marginTop: 24, alignItems: 'center' },
  punto: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.2)' },
  puntoActivo: { width: 20, backgroundColor: '#5B2CD5' },

  panelDerecho: {
    flex: 1.4,
    backgroundColor: '#0D0D0D',
    paddingHorizontal: 22,
    paddingVertical: 40,
    justifyContent: 'center',
    minWidth: 180,
  },

  tituloLogin: { fontSize: 32, fontWeight: '800', color: '#fff' },
  subLogin: { fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 32 },

  etiquetaCampo: { fontSize: 10, color: 'rgba(255,255,255,0.45)', marginBottom: 8 },

  input: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(91,44,213,0.3)',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    marginBottom: 18,
  },

  inputEnfocado: { borderColor: '#5B2CD5' },

  olvidoWrap: { alignSelf: 'flex-end', marginBottom: 26 },
  olvidoTexto: { color: 'rgba(255,255,255,0.3)' },

  botonPrimario: { backgroundColor: '#5B2CD5', padding: 14, alignItems: 'center' },
  botonPrimarioActivo: { backgroundColor: '#FFD60A' },

  textoBotonPrimario: { color: '#fff' },
  textoBotonPrimarioActivo: { color: '#0D0D0D' },

  divisor: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  lineaDivisor: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.07)' },
  textoDivisor: { marginHorizontal: 10, color: 'rgba(255,255,255,0.2)' },

  botonSecundario: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', padding: 13 },
  textoBotonSecundario: { color: 'rgba(255,255,255,0.45)' },

  barraEstado: { flexDirection: 'row', marginTop: 28 },
  puntoEstado: { width: 5, height: 5, backgroundColor: '#5B2CD5' },
  textoEstado: { fontSize: 9, color: 'rgba(255,255,255,0.2)' },
});

export default LoginScreen;