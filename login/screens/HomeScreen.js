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
    Animated.spring(btnScale, { toValue: 0.97, useNativeDriver: false }).start(); // ← fix
  };
  const handlePressOut = () => {
    setBtnPressed(false);
    Animated.spring(btnScale, { toValue: 1, useNativeDriver: false }).start(); // ← fix
  };

  return (
    <View style={styles.root}>

      {/* ── BACKGROUND LAYER ── */}
      <LinearGradient
        colors={['#0a0a1a', '#12083a', '#0D0D0D']}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.orb, styles.orb1]} />
      <View style={[styles.orb, styles.orb2]} />
      <View style={[styles.orb, styles.orb3]} />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')} // ← fix
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>ONLINE</Text>
        </View>
      </View>

      {/* ── SCROLLABLE CONTENT ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Hero section */}
        <View style={styles.heroSection}>
          <Text style={styles.tagline}>// NEURAL ACCESS v3.0</Text>
          <Text style={styles.heroTitle}>{"Welcome\nback."}</Text>
          <Text style={styles.heroSub}>
            You are connected to a secure, encrypted session. All systems nominal.
          </Text>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>98.6%</Text>
            <Text style={styles.statLabel}>UPTIME</Text>
          </View>
          <View style={[styles.statCard, styles.statCardAccent]}>
            <Text style={[styles.statValue, styles.statValueAccent]}>ACTIVE</Text>
            <Text style={styles.statLabel}>SESSION</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>v3.0</Text>
            <Text style={styles.statLabel}>BUILD</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>MODULES</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Feature cards */}
        <View style={styles.cardGrid}>
          <View style={styles.featureCard}>
            <View style={[styles.cardIcon, { backgroundColor: 'rgba(91,44,213,0.2)' }]} />
            <View style={styles.cardTextWrap}>
              <Text style={styles.cardTitle}>Dashboard</Text>
              <Text style={styles.cardDesc}>
                Monitor real-time metrics and system health across all nodes.
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.cardIcon, { backgroundColor: 'rgba(255,214,10,0.15)' }]} />
            <View style={styles.cardTextWrap}>
              <Text style={styles.cardTitle}>Analytics</Text>
              <Text style={styles.cardDesc}>
                Deep insights into usage patterns and performance data.
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.cardIcon, { backgroundColor: 'rgba(91,44,213,0.15)' }]} />
            <View style={styles.cardTextWrap}>
              <Text style={styles.cardTitle}>Settings</Text>
              <Text style={styles.cardDesc}>
                Manage your profile, security preferences, and integrations.
              </Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { marginTop: 8 }]}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>SESSION</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Info row */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>ENCRYPTION</Text>
            <Text style={styles.infoValue}>AES-256</Text>
          </View>
          <View style={styles.infoSep} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>PROTOCOL</Text>
            <Text style={styles.infoValue}>TLS 1.3</Text>
          </View>
          <View style={styles.infoSep} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>REGION</Text>
            <Text style={styles.infoValue}>US-EAST</Text>
          </View>
        </View>

        {/* Sign out button */}
        <Animated.View style={[styles.btnWrap, { transform: [{ scale: btnScale }] }]}>
          <TouchableOpacity
            style={[styles.btnSignOut, btnPressed && styles.btnSignOutActive]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => navigation.goBack()}
            activeOpacity={1}
          >
            <Text style={[styles.btnSignOutText, btnPressed && styles.btnSignOutTextActive]}>
              Cerrar sesión
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerDot} />
          <Text style={styles.footerText}>ENCRYPTED · SECURE CONNECTION</Text>
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

  /* ── BACKGROUND ORBS ── */
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },
  orb1: {
    width: 280,
    height: 280,
    backgroundColor: 'rgba(91,44,213,0.18)',
    top: -60,
    right: -80,
  },
  orb2: {
    width: 180,
    height: 180,
    backgroundColor: 'rgba(255,214,10,0.07)',
    bottom: 120,
    left: -60,
  },
  orb3: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(91,44,213,0.12)',
    bottom: 300,
    right: 20,
  },

  /* ── HEADER ── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(91,44,213,0.15)',
  },
  logo: {
    width: 100,
    height: 32,
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

  /* ── SCROLL ── */
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },

  /* ── HERO ── */
  heroSection: {
    paddingTop: 36,
    paddingBottom: 28,
  },
  tagline: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    color: '#5B2CD5',
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 44,
    letterSpacing: -1,
    marginBottom: 14,
  },
  heroSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.35)',
    lineHeight: 20,
    maxWidth: 280,
  },

  /* ── STATS ── */
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(91,44,213,0.2)',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statCardAccent: {
    backgroundColor: 'rgba(91,44,213,0.12)',
    borderColor: 'rgba(91,44,213,0.5)',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  statValueAccent: {
    color: '#5B2CD5',
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 1.5,
  },

  /* ── DIVIDER ── */
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  dividerText: {
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.2)',
    letterSpacing: 2,
  },

  /* ── FEATURE CARDS ── */
  cardGrid: {
    gap: 10,
    marginBottom: 28,
  },
  featureCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(91,44,213,0.2)',
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    flexShrink: 0,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 3,
  },
  cardDesc: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
    lineHeight: 16,
  },

  /* ── INFO ROW ── */
  infoRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(91,44,213,0.15)',
    borderRadius: 10,
    paddingVertical: 16,
    marginBottom: 28,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoSep: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginVertical: 4,
  },
  infoLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.25)',
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },

  /* ── SIGN OUT BUTTON ── */
  btnWrap: {
    marginBottom: 32,
  },
  btnSignOut: {
    backgroundColor: '#5B2CD5',
    borderRadius: 8,
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

  /* ── FOOTER ── */
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