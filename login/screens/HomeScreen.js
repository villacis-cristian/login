import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  ScrollView,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {

  const btnScale = useRef(new Animated.Value(1)).current;
  const [btnPressed, setBtnPressed] = useState(false);

  const handlePressIn = () => {

    setBtnPressed(true);

    Animated.spring(btnScale, {
      toValue: 0.96,
      useNativeDriver: false,
    }).start();

  };

  const handlePressOut = () => {

    setBtnPressed(false);

    Animated.spring(btnScale, {
      toValue: 1,
      useNativeDriver: false,
    }).start();

  };

  return (

    <View style={styles.root}>

      {/* BACKGROUND */}
      <LinearGradient
        colors={['#050510', '#12083a', '#0D0D0D']}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.orb, styles.orb1]} />
      <View style={[styles.orb, styles.orb2]} />
      <View style={[styles.orb, styles.orb3]} />

      {/* HEADER */}
      <View style={styles.header}>

        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.statusBadge}>

          <View style={styles.statusDot} />

          <Text style={styles.statusText}>
            AVES
          </Text>

        </View>

      </View>

      {/* SCROLL */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* HERO */}
        <View style={styles.heroSection}>

          <Text style={styles.tagline}>
            // BIRD GALLERY
          </Text>

          <Text style={styles.heroTitle}>
            {"Explora\nlas aves"}
          </Text>

          <Text style={styles.heroSub}>
            Descubre especies increíbles, colores únicos
            y la belleza de las aves del mundo.
          </Text>

        </View>

        {/* DIVIDER */}
        <View style={styles.divider}>

          <View style={styles.dividerLine} />

          <Text style={styles.dividerText}>
            GALERÍA
          </Text>

          <View style={styles.dividerLine} />

        </View>

        {/* GALERIA 2x2 */}
        <View style={styles.galleryGrid}>

          {/* CARD 1 */}
          <View style={styles.birdCard}>

            <Image
              source={require('../assets/logo.png')}
              style={styles.birdImage}
              resizeMode="cover"
            />

            <View style={styles.cardOverlay}>

              <Text style={styles.birdTitle}>
                Tucán
              </Text>

              <Text style={styles.birdDesc}>
                Ave tropical colorida.
              </Text>

            </View>

          </View>

          {/* CARD 2 */}
          <View style={styles.birdCard}>

            <Image
              source={require('../assets/logo.png')}
              style={styles.birdImage}
              resizeMode="cover"
            />

            <View style={styles.cardOverlay}>

              <Text style={styles.birdTitle}>
                Guacamayo
              </Text>

              <Text style={styles.birdDesc}>
                Plumaje vibrante y exótico.
              </Text>

            </View>

          </View>

          {/* CARD 3 */}
          <View style={styles.birdCard}>

            <Image
              source={require('../assets/logo.png')}
              style={styles.birdImage}
              resizeMode="cover"
            />

            <View style={styles.cardOverlay}>

              <Text style={styles.birdTitle}>
                Colibrí
              </Text>

              <Text style={styles.birdDesc}>
                Pequeño y veloz.
              </Text>

            </View>

          </View>

          {/* CARD 4 */}
          <View style={styles.birdCard}>

            <Image
              source={require('../assets/logo.png')}
              style={styles.birdImage}
              resizeMode="cover"
            />

            <View style={styles.cardOverlay}>

              <Text style={styles.birdTitle}>
                Águila
              </Text>

              <Text style={styles.birdDesc}>
                Elegancia y poder.
              </Text>

            </View>

          </View>

        </View>

        {/* BUTTON */}
        <Animated.View
          style={[
            styles.btnWrap,
            {
              transform: [{ scale: btnScale }],
            },
          ]}
        >

          <TouchableOpacity
            style={[
              styles.btnSignOut,
              btnPressed && styles.btnSignOutActive,
            ]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => navigation.goBack()}
            activeOpacity={1}
          >

            <Text
              style={[
                styles.btnSignOutText,
                btnPressed && styles.btnSignOutTextActive,
              ]}
            >
              Volver
            </Text>

          </TouchableOpacity>

        </Animated.View>

        {/* FOOTER */}
        <View style={styles.footer}>

          <View style={styles.footerDot} />

          <Text style={styles.footerText}>
            REACT NATIVE · BIRD UI
          </Text>

        </View>

      </ScrollView>

    </View>

  );
};

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },

  /* BACKGROUND */
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },

  orb1: {
    width: 260,
    height: 260,
    backgroundColor: 'rgba(91,44,213,0.18)',
    top: -80,
    right: -70,
  },

  orb2: {
    width: 180,
    height: 180,
    backgroundColor: 'rgba(255,214,10,0.07)',
    bottom: 100,
    left: -60,
  },

  orb3: {
    width: 140,
    height: 140,
    backgroundColor: 'rgba(91,44,213,0.12)',
    bottom: 260,
    right: 20,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 18,

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(91,44,213,0.15)',
  },

  logo: {
    width: 100,
    height: 40,
    tintColor: '#fff',
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,

    backgroundColor: 'rgba(91,44,213,0.15)',

    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 20,

    borderWidth: 1,
    borderColor: 'rgba(91,44,213,0.3)',
  },

  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#5B2CD5',
  },

  statusText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#5B2CD5',
    letterSpacing: 1.5,
  },

  /* SCROLL */
  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  /* HERO */
  heroSection: {
    paddingTop: 34,
    paddingBottom: 24,
  },

  tagline: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    color: '#5B2CD5',
    marginBottom: 12,
  },

  heroTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 46,
    marginBottom: 14,
  },

  heroSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 20,
    maxWidth: 300,
  },

  /* DIVIDER */
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  dividerText: {
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.25)',
    letterSpacing: 2,
  },

  /* GALLERY 2x2 */
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
    marginBottom: 30,
  },

  birdCard: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.04)',

    borderRadius: 18,
    overflow: 'hidden',

    borderWidth: 1,
    borderColor: 'rgba(91,44,213,0.18)',
  },

  birdImage: {
    width: '100%',
    height: 150,
  },

  cardOverlay: {
    padding: 14,
  },

  birdTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },

  birdDesc: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 11,
    lineHeight: 16,
  },

  /* BUTTON */
  btnWrap: {
    marginBottom: 26,
  },

  btnSignOut: {
    backgroundColor: '#5B2CD5',

    borderRadius: 12,

    paddingVertical: 15,

    alignItems: 'center',
  },

  btnSignOutActive: {
    backgroundColor: '#FFD60A',
  },

  btnSignOutText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  btnSignOutTextActive: {
    color: '#0D0D0D',
  },

  /* FOOTER */
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  footerDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#5B2CD5',
  },

  footerText: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.2)',
    letterSpacing: 1,
  },

});

export default HomeScreen;