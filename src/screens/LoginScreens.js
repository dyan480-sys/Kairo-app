// src/screens/LoginScreens.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme/theme';

export default function LoginScreen({ navigation }) {
  // Estados para capturar lo que el usuario escribe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // [FUTURO]: Aquí se conectará la autenticación real con Spring Boot y Spring Security
  const handleLogin = () => {
    // Credenciales simuladas de prueba para la presentación
    const correoCorrecto = "kairo@admin.com";
    const passwordCorrecto = "123456";

    if (email === correoCorrecto && password === passwordCorrecto) {
      setErrorMessage('');
      navigation.navigate('MainTabs');
    } else {
      setErrorMessage('Correo o contraseña incorrectos. Intenta con kairo@admin.com / 123456');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>KAIRO</Text>
      <Text style={styles.welcomeText}>Gestor de Historias Ilustradas</Text>

      {/* Mensaje de error visual si las credenciales fallan */}
      {errorMessage ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      <TextInput 
        placeholder="Correo (ej: kairo@admin.com)" 
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      
      <TextInput 
        placeholder="Contraseña (ej: 123456)" 
        placeholderTextColor={COLORS.textSecondary}
        secureTextEntry 
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
        <Text style={styles.btnLoginText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnRegister}>
        <Text style={styles.btnRegisterText}>¿No tienes cuenta? Regístrate [FUTURO]</Text>
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
    marginBottom: 6,
    letterSpacing: 2,
  },
  welcomeText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  errorBox: {
    backgroundColor: '#381A24',
    borderWidth: 1,
    borderColor: '#E11D48',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#FF88A2',
    fontSize: 13,
    textAlign: 'center',
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
    fontSize: 15,
  },
  btnLogin: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  btnLoginText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  btnRegister: {
    marginTop: 20,
    alignItems: 'center',
  },
  btnRegisterText: {
    color: COLORS.accent,
    fontSize: 13,
  },
});