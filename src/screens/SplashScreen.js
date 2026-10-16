// src/screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/theme';

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  // Función interactiva de recarga o reinicio de animación al tocar el isotipo
  const handleReloadAnimation = () => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.5);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 50,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    // [FUTURO]: Validación inicial de token de sesión con Spring Boot
    handleReloadAnimation();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 4000); // 4 segundos para apreciar la animación interactiva

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.logoContainer, 
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
        ]}
      >
        {/* Isotipo interactivo: Haz clic en la K para reiniciar la animación */}
        <TouchableOpacity style={styles.logoCircle} onPress={handleReloadAnimation}>
          <Text style={styles.logoText}>K</Text>
        </TouchableOpacity>
        <Text style={styles.brandTitle}>KAIRO</Text>
        <Text style={styles.tagline}>Toca la K para recargar • Tu historia comienza aquí</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.accent,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 68,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    letterSpacing: 3,
  },
  tagline: {
    fontSize: 12,
    color: COLORS.accent,
    letterSpacing: 1.2,
    marginTop: 8,
    textTransform: 'uppercase',
  },
});