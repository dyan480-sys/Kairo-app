// src/screens/LoginScreens.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme/theme';

export default function LoginScreen({ navigation }) {
  // [FUTURO]: Aquí se conectará la autenticación con Spring Boot y PostgreSQL
  const handleLogin = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>KAIRO</Text>
      <Text style={styles.welcomeText}>¡Bienvenido de nuevo!</Text>

      <TextInput 
        placeholder="Correo electrónico o usuario" 
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input} 
      />
      
      <TextInput 
        placeholder="Contraseña" 
        placeholderTextColor={COLORS.textSecondary}
        secureTextEntry 
        style={styles.input} 
      />

      <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
        <Text style={styles.btnLoginText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnRegister}>
        <Text style={styles.btnRegisterText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 2,
  },
  welcomeText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: COLORS.surfaceLight,
    color: COLORS.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    fontSize: 16,
  },
  btnLogin: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  btnLoginText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnRegister: {
    marginTop: 20,
    alignItems: 'center',
  },
  btnRegisterText: {
    color: COLORS.accent,
    fontSize: 14,
  },
});