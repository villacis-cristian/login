import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Share,
  TextInput
} from 'react-native';

import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebaseConfig';

// ───── PALETA ─────
const C = {
  bg:'#150018', surface:'#240e28', mid:'#331d37', accent:'#422b47', muted:'#513957',
  gray1:'#2a2a2d', gray2:'#3d3d42', gray3:'#6b6b72', gray4:'#a8a8b0',
  white:'#f0eef2', offwhite:'#c9c6cd', black:'#000',
  green:'#22c55e', red:'#e53e3e'
};

export default function HomeScreen({ navigation, route }) {

  const { docenteName, codigoRegistro, profileImage } = route?.params || {};

  const [role, setRole] = useState('user');
  const [username, setUsername] = useState('PLAYER');
  const [image, setImage] = useState(null);
  const [search, setSearch] = useState('');

  const scrollY = useRef(new Animated.Value(0)).current;

  // ───── PERFIL ─────
  useEffect(() => {
    if (profileImage) setImage(profileImage);
  }, [profileImage]);

  // ───── FIREBASE USER ─────
  useEffect(() => {
    const loadUserData = async () => {
      if (!auth.currentUser) return;

      const ref = doc(db, 'users', auth.currentUser.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setRole(data.role || 'user');
        setUsername(data.username || 'PLAYER');
      }
    };

    loadUserData();
  }, []);

  // ───── SHARE ─────
  const handleShare = async () => {
    await Share.share({
      message: `MENSAJE: ${docenteName || username} registró asistencia correctamente.`,
    });
  };

  // ✅ LOGOUT
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.log(error);
    }
  };

  const isAdmin = role === 'admin';

  const floatingY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 140],
    extrapolate: 'clamp'
  });

  return (
    <View style={{ flex: 1 }}>

      {/* ───── PERFIL FLOTANTE ───── */}
      <Animated.View style={[
        styles.floatCard,
        { transform: [{ translateY: floatingY }] }
      ]}>

        <Image
          source={image ? { uri: image } : require('../assets/logo.png')}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {docenteName || username}
        </Text>

        <Text style={styles.code}>
          REG #{codigoRegistro || '0000'}
        </Text>

      </Animated.View>

      {/* ───── SCROLL ───── */}
      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 60 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >

        {/* ───── HEADER ───── */}
        <View style={styles.header}>
          <Text style={styles.title}>
            AVASHI'<Text style={{ color: C.green }}>KOL</Text>
          </Text>
          <Text style={styles.subtitle}>
            te damos la bienvenida
          </Text>
        </View>

        {/* ───── NAV ───── */}
        <View style={styles.navBar}>
          
          <View style={styles.navBtns}>
            {['GAMES', 'MOVIES', 'SERIES'].map((item) => (
              <TouchableOpacity key={item} style={styles.navBtn}>
                <Text style={styles.navText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="BUSCAR..."
            placeholderTextColor={C.gray3}
            style={styles.search}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* ───── ADMIN ───── */}
        {isAdmin && (
          <View style={styles.admin}>
            <Text style={styles.adminText}>⚡ ADMIN MODE</Text>
          </View>
        )}

        {/* ───── ESTADO ───── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ESTADO DEL SISTEMA</Text>
          <Text style={styles.text}>● CONEXIÓN ACTIVA</Text>
          <Text style={styles.text}>● ASISTENCIA DISPONIBLE</Text>
        </View>

        {/* ✅ BOTONES PRINCIPALES */}
        <View style={styles.buttons}>

          {/* ✅ LOGOUT ARRIBA */}
          <TouchableOpacity style={styles.logoutTop} onPress={handleLogout}>
            <Text style={styles.logoutText}>CERRAR SESIÓN</Text>
          </TouchableOpacity>

          {/* COMPARTIR */}
          <TouchableOpacity style={styles.btn} onPress={handleShare}>
            <Text style={styles.btnText}>COMPARTIR</Text>
          </TouchableOpacity>

          {/* PERFIL */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Profile', {
              docenteName,
              codigoRegistro
            })}
          >
            <Text style={styles.btnText}>IR A PERFIL</Text>
          </TouchableOpacity>

        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          © 2026 · REACT NATIVE APP
        </Text>

      </Animated.ScrollView>
    </View>
  );
}

// ───── STYLES ─────
const styles = StyleSheet.create({

  container:{ flex:1, backgroundColor:C.bg },

  header:{ alignItems:'center', marginTop:60, marginBottom:30 },

  title:{ color:C.white, fontSize:18 },

  subtitle:{ color:C.offwhite, marginTop:10 },

  floatCard:{
    position:'absolute',
    top:40,
    right:10,
    zIndex:100,
    backgroundColor:C.surface,
    borderWidth:1,
    borderColor:C.green,
    padding:10,
    alignItems:'center'
  },

  avatar:{ width:70, height:70, borderRadius:35 },

  name:{ color:C.white, fontSize:10 },

  code:{ color:C.gray3, fontSize:8 },

  navBar:{ flexDirection:'row', margin:10 },

  navBtns:{ flexDirection:'row', gap:5 },

  navBtn:{ backgroundColor:C.accent, padding:6 },

  navText:{ color:C.white, fontSize:8 },

  search:{
    flex:1,
    backgroundColor:C.gray1,
    marginLeft:10,
    color:C.white,
    padding:5
  },

  admin:{ backgroundColor:C.green, padding:8 },

  adminText:{ color:'#000' },

  section:{ margin:20, backgroundColor:C.surface, padding:15 },

  sectionTitle:{ color:C.green },

  text:{ color:C.white },

  buttons:{ padding:20, gap:10 },

  // ✅ LOGOUT ARRIBA (nuevo estilo)
  logoutTop:{
    backgroundColor:C.red,
    padding:12
  },

  logoutText:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold'
  },

  btn:{ backgroundColor:C.accent, padding:10 },

  btnText:{ color:C.white, textAlign:'center' },

  footer:{ textAlign:'center', color:C.gray3, marginTop:20 }

});
``