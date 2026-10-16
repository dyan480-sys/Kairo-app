// src/screens/LibraryScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/theme';

export default function LibraryScreen() {
  // [FUTURO]: Estos datos de la biblioteca personal se cargarán desde PostgreSQL vinculados al ID del usuario autenticado
  const misObrasGuardadas = [
    { id: '1', titulo: "El Despertar del Monarca", capituloActual: "Capítulo 27", estado: "Leyendo" },
    { id: '2', titulo: "Torre de Hechizos", capituloActual: "Capítulo 5", estado: "Guardado" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Mi Biblioteca KAIRO</Text>
      
      <View style={styles.walletCard}>
        <Text style={styles.walletLabel}>Saldo de Monedas KAIRO</Text>
        <Text style={styles.coinsText}>🪙 50 Monedas disponibles</Text>
      </View>

      <Text style={styles.sectionTitle}>Continuar Leyendo</Text>
      
      {misObrasGuardadas.map(( obra) => (
        <View key={obra.id} style={styles.card}>
          <Text style={styles.cardTitle}>{obra.titulo}</Text>
          <Text style={styles.cardProgress}>Progreso: {obra.capituloActual} ({obra.estado})</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText}>Seguir Leyendo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.btnSecondary}>
              <Text style={styles.btnSecondaryText}>Desbloquear Cap.</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  walletCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginBottom: 24,
  },
  walletLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  coinsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  cardProgress: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    fontSize: 13,
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: COLORS.surfaceLight,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  btnSecondaryText: {
    color: COLORS.secondary,
    fontWeight: 'bold',
    fontSize: 13,
  },
});