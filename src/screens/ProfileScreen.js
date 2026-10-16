// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/theme';

export default function ProfileScreen() {
  // [FUTURO]: Estos datos se sincronizarán con Spring Boot al autenticar el usuario
  const usuario = {
    nombre: "Vilma Dayana",
    nivel: "Nivel 3 (Lector Activo)",
    monedas: 50,
    obrasGuardadas: 4,
    comentarios: 12,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Perfil KAIRO</Text>

      <View style={styles.card}>
        <Text style={styles.nameText}>{usuario.nombre}</Text>
        <Text style={styles.infoText}>Rango: {usuario.nivel}</Text>
        <Text style={styles.infoText}>Monedas disponibles: 🪙 {usuario.monedas}</Text>
        <Text style={styles.infoText}>Obras en Biblioteca: {usuario.obrasGuardadas}</Text>
        <Text style={styles.infoText}>Comentarios realizados: {usuario.comentarios}</Text>

        <TouchableOpacity style={styles.btnAction}>
          <Text style={styles.btnText}>Gestionar Suscripción y Monedas</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: 22,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  btnAction: {
    backgroundColor: COLORS.secondary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  btnText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
