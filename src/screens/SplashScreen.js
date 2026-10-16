import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image, Text } from 'react-native';

export default function SplashScreen({ navigation }) {
  // Valores animados para opacidad y tamaño (escala)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // 1. Iniciar la animación paralela (Aumentar tamaño + Aparecer)
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Transcurrido el tiempo (3.5 segundos), cambiar a la pantalla de Login
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      {/* Contenedor Animado */}
      <Animated.View 
        style={[
          styles.logoContainer, 
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
        ]}
      >
        {/* Si ya guardaste la imagen en assets/logo.png usas require('../../assets/logo.png') */}
        {/* Si aún no la has colocado, mostramos el isotipo cósmico generado con estilos */}
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>K</Text>
        </View>
        <Text style={styles.brandTitle}>KAIRO</Text>
        <Text style={styles.tagline}>TU PRÓXIMA HISTORIA COMIENZA AQUÍ</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0B18', // Fondo azul oscuro espacial de Kairo
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1B3DA8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3EC5FF',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#EDE7FF',
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#EDE7FF',
    letterSpacing: 4,
  },
  tagline: {
    fontSize: 11,
    color: '#3EC5FF',
    letterSpacing: 2,
    marginTop: 8,
  },
});