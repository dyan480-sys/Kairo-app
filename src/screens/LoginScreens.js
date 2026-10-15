import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>KAIRO</Text>
      <Text style={styles.welcomeText}>¡Bienvenido de nuevo!</Text>

      <TextInput placeholder="Correo electrónico o usuario" placeholderTextColor="#aaa" style={styles.input} />
      <TextInput placeholder="Contraseña" placeholderTextColor="#aaa" secureTextEntry style={styles.input} />

      <TouchableOpacity style={styles.btnLogin}>
        <Text style={styles.btnLoginText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnRegister}>
        <Text style={styles.btnRegisterText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 24, justifyContent: 'center' },
  headerTitle: { fontSize: 36, fontWeight: 'bold', color: '#ff4757', textAlign: 'center', marginBottom: 10 },
  welcomeText: { fontSize: 16, color: '#ccc', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#1e1e1e', color: '#fff', paddingHorizontal: 16, paddingVertical: 14, borderRadius: 8, borderWidth: 1, borderColor: '#333', marginBottom: 16, fontSize: 16 },
  btnLogin: { backgroundColor: '#ff4757', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnLoginText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  btnRegister: { marginTop: 20, alignItems: 'center' },
  btnRegisterText: { color: '#ff4757', fontSize: 14 },
});