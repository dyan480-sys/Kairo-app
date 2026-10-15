import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/adaptive-icon.png')} style={styles.logo} />
      <Text style={styles.title}>KAIRO</Text>
      <Text style={styles.subtitle}>Descubre, lee y participa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
  logo: { width: 120, height: 120, resizeMode: 'contain', marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#ffffff', letterSpacing: 2 },
  subtitle: { fontSize: 14, color: '#888888', marginTop: 5 },
});