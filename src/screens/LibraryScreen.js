import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../theme/theme';

export default function LibraryScreen({ route, navigation }) {
  const usuario = route.params?.usuario || { monedas: 0 };
  const [monedas, setMonedas] = useState(usuario.monedas);

  // Datos simulados (luego vendrán de la BD)
  const misObras = [
    { id: '1', titulo: "Solo Leveling", cap: 3, estado: "Leyendo", progreso: 45, img: null },
    { id: '2', titulo: "Torre de Dios", cap: 1, estado: "Nuevo", progreso: 5, img: null },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerTitle}>Mi Biblioteca</Text>
      
      {/* Tarjeta de Saldo Mejorada */}
      <View style={styles.walletCard}>
        <Text style={styles.walletLabel}>SALDO KAIRO</Text>
        <View style={styles.coinsRow}>
          <Text style={styles.coinIcon}>🪙</Text>
          <Text style={styles.coinsText}>{monedas} Monedas</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Continúa leyendo</Text>
      
      {misObras.map((obra) => (
        <View key={obra.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>{obra.titulo}</Text>
              <Text style={styles.cardProgress}>Progreso: Capítulo {obra.cap}</Text>
            </View>
            <Text style={[styles.statusBadge, obra.estado === 'Leyendo' ? styles.statusReading : styles.statusNew]}>
              {obra.estado}
            </Text>
          </View>
          
          {/* Barra de progreso dorada */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${obra.progreso}%` }]} />
          </View>

          <View style={styles.buttonRow}>
            {/* CAMBIO CLAVE: Este botón ahora navega a DetailScreen */}
            <TouchableOpacity 
              style={styles.btnPrimary}
              onPress={() => navigation.navigate('Detail', { 
                obra: { titulo: obra.titulo, autor: "Autor", desc: "Sinopsis...", img: obra.img } 
              })}
            >
              <Text style={styles.btnPrimaryText}>Leer ahora</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.btnSecondary}>
              <Text style={styles.btnSecondaryText}>Desbloquear (30 🪙)</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 24, paddingTop: 50 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.white, marginBottom: 20 },
  
  walletCard: { 
    backgroundColor: COLORS.surface, borderRadius: 16, padding: 20, marginBottom: 30,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.gold // Borde dorado sutil
  },
  walletLabel: { fontSize: 12, color: COLORS.gray, letterSpacing: 1 },
  coinsRow: { flexDirection: 'row', alignItems: 'center' },
  coinIcon: { fontSize: 18, marginRight: 6 },
  coinsText: { fontSize: 18, fontWeight: 'bold', color: COLORS.gold },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.white, marginBottom: 16 },
  card: { backgroundColor: COLORS.surface, padding: 18, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.white },
  cardProgress: { fontSize: 13, color: COLORS.gray, marginTop: 4 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, fontSize: 11, fontWeight: 'bold' },
  statusReading: { backgroundColor: COLORS.gold, color: COLORS.background },
  statusNew: { backgroundColor: COLORS.surface, color: COLORS.gray, borderWidth: 1, borderColor: COLORS.border },
  
  progressBarBg: { height: 4, backgroundColor: COLORS.border, borderRadius: 2, marginBottom: 16, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: COLORS.gold },
  
  buttonRow: { flexDirection: 'row', gap: 10 },
  btnPrimary: { flex: 1, backgroundColor: COLORS.gold, padding: 14, borderRadius: 10, alignItems: 'center' },
  btnPrimaryText: { color: COLORS.background, fontWeight: 'bold', fontSize: 14 },
  btnSecondary: { flex: 1, backgroundColor: 'transparent', padding: 14, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  btnSecondaryText: { color: COLORS.gray, fontWeight: 'bold', fontSize: 13 },
});